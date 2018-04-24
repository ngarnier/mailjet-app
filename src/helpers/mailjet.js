import { Buffer } from 'buffer'
import { getTS } from './util'

const Limit = 50

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

export const mailjetGet = async (route, publicKey, secretKey, filters) => {
  const encodedKeys = await Buffer.from(`${publicKey}:${secretKey}`).toString('base64')
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
  if (res.StatusCode) {
    // should handle errors here
  } else {
    return res.Data
  }
}

const getCampaigns = async (apikey) => {
  const { publicKey, secretKey } = apikey
  return mailjetGet('campaigndraft', publicKey, secretKey, {
    Limit,
    Status: '0, 1, 2, 3, 4',
  })
}

export const getAllCampaigns = async (apikeys) => {
  const campaigns = []
  const { publicKey, secretKey } = apikeys
  const keyData = await getCampaigns(apikeys)
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
  return campaigns
}

export const getAllMessageIDs = async (apikeys) => {
  const { publicKey, secretKey } = apikeys
  const d = getTS()
  const emails = []
  const campaigns = []
  const contacts = []
  const messages = await mailjetGet('message', publicKey, secretKey, {
    Limit,
    FromType: 'Transactional',
    FromTS: d,
  })
  for (let i = 0; i < messages.length; i++) {
    const messageID = messages[i].ID
    const status = messages[i].Status
    const campaignID = messages[i].CampaignID
    const contactID = messages[i].ContactID
    let campaign
    let contact
    const campaignIndex = campaigns.findIndex(c => c.campaignID === campaignID)
    if (campaignIndex !== -1) {
      campaign = campaigns[campaignIndex]
    } else {
      const campaigns = await mailjetGet(`campaign/${campaignID}`, publicKey, secretKey)
      campaign = {
        campaignID,
        fromEmail: campaigns[0].FromEmail,
        fromName: campaigns[0].FromName,
        opened: campaigns[0].OpenTracked,
        sentAt: campaigns[0].SendEndAt,
        subject: campaigns[0].Subject,
      }
      campaigns.push(campaign)
    }
    const contactIndex = contacts.findIndex(c => c.contactID === contactID)
    if (contactIndex !== -1) {
      contact = contacts[contactIndex]
    } else {
      const contactData = await mailjetGet(`contact/${contactID}`, publicKey, secretKey)
      contact = {
        contactID,
        email: contactData[0].Email,
      }
      contacts.push(contact)
    }
    emails.push({
      messageID,
      status,
      campaign,
      contact,
    })
  }
  return emails
}

export const getLists = async (apikey) => {
  const { publicKey, secretKey } = apikey
  return mailjetGet('contactslist', publicKey, secretKey, {
    Limit,
    isDeleted: false,
    Sort: 'Name',
  })
}

export const getListStats = async (apikey, id) => {
  const { publicKey, secretKey } = apikey
  const lists = await mailjetGet(`liststatistics/${id}`, publicKey, secretKey, {
    CalcActive: true,
    CalcActiveUnsub: true,
  })

  const {
    ActiveCount,
    ActiveUnsubscribedCount,
    DeliveredCount,
    OpenedCount,
    ClickedCount } = lists[0]
  return {
    active: ActiveCount,
    unsub: ActiveUnsubscribedCount,
    delivered: DeliveredCount,
    opened: `${Math.floor((OpenedCount / DeliveredCount) * 100) || 0}%`,
    clicked: `${Math.floor((ClickedCount / OpenedCount) * 100) || 0}%`,
  }
}

export const getListContactIDs = async (apikeys, listName) => {
  const { publicKey, secretKey } = apikeys
  return mailjetGet('listrecipient', publicKey, secretKey, {
    ListName: listName,
    Limit,
    Unsub: false,
    IgnoreDeleted: true,
  })
}

export const getListContacts = async (apikeys, listName) => {
  const { publicKey, secretKey } = apikeys
  const contactIDs = await getListContactIDs(apikeys, listName)
  const contacts = []
  for (let i = 0; i < contactIDs.length; i++) {
    const contactID = contactIDs[i].ContactID
    const contact = await mailjetGet(`contact/${contactID}`, publicKey, secretKey)
    contacts.push(contact[0].Email)
  }
  return contacts
}
