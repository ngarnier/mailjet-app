import { Buffer } from 'buffer'
import { getTS } from './util'

export const checkAuth = async (publicKey, secretKey) => {
  const auth = await mailjetGet('template', publicKey, secretKey)
  return auth
}

export const getMailjetKeys = async (publicKey, secretKey) => {
  const response = await mailjetGet('apikey', publicKey, secretKey)
  const data = response.Data
  for (let i = 0; i < data.length; i++) {
    if (data[i].APIKey === publicKey) {
      return {
        name: data[i].Name,
        publicKey: data[i].APIKey,
        secretKey: data[i].SecretKey,
      }
    }
  }
  return "Couldn't authenticate with those keys"
}

const getEncodedKeys = (publicKey, secretKey) => {
  return Buffer.from(`${publicKey}:${secretKey}`).toString('base64')
}

export const mailjetGet = async (route, publicKey, secretKey, filters) => {
  const encodedKeys = await getEncodedKeys(publicKey, secretKey)
  let formattedFilters = ''
  if (filters) {
    formattedFilters = '?'
    Object.keys(filters).map((filter) => {
      formattedFilters += `${filter}=${filters[filter]}&`
    })
  }
  const response = await fetch(`https://api.mailjet.com/v3/REST/${route}${formattedFilters}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${encodedKeys}`
    },
  })
  const res = await response.json()
  return res
}

const getCampaigns = async (apikey) => {
  const { publicKey, secretKey } = apikey
  const { Data } = await mailjetGet('campaigndraft', publicKey, secretKey, {
    Limit: 5,
    Status: '0, 1, 2, 3, 4'
  })
  return Data
}

export const getAllCampaigns = async (apikeys) => {
  const campaigns = []
  for (let i = 0; i < apikeys.size; i++) {
    const { publicKey, secretKey } = apikeys.get(i)
    const keyData = await getCampaigns(apikeys.get(i))
    keyData.map((e) => {
      let status = ''
      switch (e.Status) {
        case 0:
          status = 'Draft'
          break
        case 1:
          status = 'Scheduled'
          break
        case 2:
        case 3:
        case 4:
          status = 'Sent'
          break
        default:
          status = 'Unknown'
      }
      campaigns.push({
        publicKey,
        secretKey,
        title: e.Title,
        subject: e.Subject,
        senderName: e.SenderName,
        senderEmail: e.SenderEmail,
        status,
        id: e.ID,
      })
    })
  }
  return campaigns
}

export const getCampaignStats = async (campaign) => {
  const { publicKey, secretKey, id, subject } = campaign

  const campaignStats = await mailjetGet('statcounters', publicKey, secretKey, {
    CounterSource: 'Campaign',
    SourceID: id,
    CounterResolution: 'Lifetime',
    CounterTiming: 'Message',
  })
  const counter = campaignStats.Data[0]
  const stats = {
    id,
    subject,
    sent: counter.MessageSentCount,
    opens: `${Math.floor((counter.MessageOpenedCount / counter.MessageSentCount) * 100) || 0}%`,
    clicks: `${Math.floor((counter.MessageClickedCount / counter.MessageOpenedCount) * 100) || 0}%`
  }
  return stats
}

export const getAllStats = async (campaigns) => {
  const stats = []
  for (let i = 0; i < campaigns.length; i++) {
    const campaignStats = await getCampaignStats(campaigns[i])
    stats.push(campaignStats)
  }
  return stats
}

export const getAllMessageIDs = async (apikeys) => {
  const { publicKey, secretKey } = apikeys
  const d = getTS()
  const messages = []
  const campaigns = []
  const contacts = []
  const { Data } = await mailjetGet('message', publicKey, secretKey, {
    Limit: 100,
    FromType: 'Transactional',
    FromTS: d,
  })
  for (let i = 0; i < Data.length; i++) {
    const messageID = Data[i].ID
    const status = Data[i].Status
    const campaignID = Data[i].CampaignID
    const contactID = Data[i].ContactID
    let campaign
    let contact
    const campaignIndex = campaigns.findIndex(c => c.campaignID === campaignID)
    if (campaignIndex !== -1) {
      campaign = campaigns[campaignIndex]
    } else {
      const { Data } = await mailjetGet(`campaign/${campaignID}`, publicKey, secretKey)
      campaign = {
        campaignID,
        fromEmail: Data[0].FromEmail,
        fromName: Data[0].FromName,
        opened: Data[0].OpenTracked,
        sentAt: Data[0].SendEndAt,
        subject: Data[0].Subject,
      }
      campaigns.push(campaign)
    }
    const contactIndex = contacts.findIndex(c => c.contactID === contactID)
    if (contactIndex !== -1) {
      contact = contacts[contactIndex]
    } else {
      const { Data } = await mailjetGet(`contact/${contactID}`, publicKey, secretKey)
      contact = {
        contactID,
        email: Data[0].Email,
      }
      contacts.push(contact)
    }
    messages.push({
      messageID,
      status,
      campaign,
      contact,
    })
  }
  return messages
}

const getLists = async (apikey) => {
  const { publicKey, secretKey } = apikey
  const { Data } = await mailjetGet('contactslist', publicKey, secretKey, {
    Limit: 5,
    isDeleted: false,
  })
  return Data
}

const getListStats = async (apikey, id) => {
  const { publicKey, secretKey } = apikey
  const { Data } = await mailjetGet(`liststatistics/${id}`, publicKey, secretKey, {
    CalcActive: true,
    CalcActiveUnsub: true,
  })

  const {
    ActiveCount,
    ActiveUnsubscribedCount,
    DeliveredCount,
    OpenedCount,
    ClickedCount } = Data[0]
  return {
    active: ActiveCount,
    unsub: ActiveUnsubscribedCount,
    delivered: DeliveredCount,
    opened: `${Math.floor((OpenedCount / DeliveredCount) * 100) || 0}%`,
    clicked: `${Math.floor((ClickedCount / OpenedCount) * 100) || 0}%`,
  }
}

export const getAllLists = async (apikeys) => {
  const lists = []
  for (let i = 0; i < apikeys.size; i++) {
    const currentKeys = apikeys.get(i)
    const keyData = await getLists(currentKeys)
    const keyLists = keyData.filter(campaign => campaign.NewsLetterID !== 0)
    for (let j = 0; j < keyLists.length; j++) {
      const listStats = await getListStats(currentKeys, keyLists[j].ID)
      const listsWithStats = Object.assign({}, {
        id: keyLists[j].ID,
        name: keyLists[j].Name,
        total: keyLists[j].SubscriberCount,
      }, listStats)
      lists.push(listsWithStats)
    }
  }
  return lists
}

export const getListContactIDs = async (apikeys, listName) => {
  const { publicKey, secretKey } = apikeys
  const { Data } = await mailjetGet('listrecipient', publicKey, secretKey, {
    ListName: listName,
    Limit: 0,
    Unsub: false,
    ignoreDeleted: true,
  })
  return Data
}

export const getListContacts = async (apikeys, listName) => {
  const { publicKey, secretKey } = apikeys
  const contactIDs = await getListContactIDs(apikeys, listName)
  const contacts = []
  for (let i = 0; i < contactIDs.length; i++) {
    const contactID = contactIDs[i].ContactID
    const { Data } = await mailjetGet(`contact/${contactID}`, publicKey, secretKey)
    contacts.push(Data[0].Email)
  }
  return contacts
}
