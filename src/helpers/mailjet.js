import { Buffer } from 'buffer'
import { getTS, formatTime } from './util'

const Limit = 50
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December']

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
  if (res.ErrorMessage) {
    return res.ErrorMessage
  }
  return res.Data
}

export const checkAuth = async (publicKey, secretKey) => {
  const auth = await mailjetGet('template', publicKey, secretKey)
  return auth
}

export const getMailjetKeys = async (publicKey, secretKey) => {
  const response = await mailjetGet('apikey', publicKey, secretKey)
  for (let i = 0; i < response.length; i++) {
    if (response[i].APIKey === publicKey) {
      return {
        name: response[i].Name,
        publicKey: response[i].APIKey,
        secretKey: response[i].SecretKey,
      }
    }
  }
  return "Couldn't authenticate with those keys"
}

const getCampaigns = async (apikey) => {
  const { publicKey, secretKey } = apikey
  return mailjetGet('campaignoverview', publicKey, secretKey, {
    Limit,
    IDType: 'Campaign',
  })
}

export const getAllCampaigns = async (apikeys) => {
  const campaigns = []
  const keyData = await getCampaigns(apikeys)
  keyData.sort((a, b) => b.SendTimeStart - a.SendTimeStart)
  keyData.map((e) => {
    const status = e.SendTimeStart > 0 ? 'Sent' : 'Draft'
    const timestamp = e.SendTimeStart
    let date
    if (timestamp > 0) {
      date = new Date(timestamp * 1000)
      date = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} at ${formatTime(date.getHours())}h${formatTime(date.getMinutes())} UTC`
    }
    campaigns.push({
      title: e.Title,
      subject: e.Subject,
      status,
      id: e.ID,
      date,
      delivered: e.DeliveredCount,
      opened: `${Math.floor((e.OpenedCount / e.DeliveredCount) * 100) || 0}%`,
      clicked: `${Math.floor((e.ClickedCount / e.OpenedCount) * 100) || 0}%`,
    })
  })
  return campaigns
}

export const getCampaignDetails = async (apikeys, id) => {
  const { publicKey, secretKey } = apikeys
  const details = await mailjetGet(`campaign/${id}`, publicKey, secretKey)
  const content = await mailjetGet(`campaigndraft/${details[0].NewsLetterID}`, publicKey, secretKey)
  const listDetails = await mailjetGet(`contactslist/${details[0].ListID}`, publicKey, secretKey)
  details[0].ListName = listDetails[0].Name
  details[0].Permalink = content[0].Url
  return details[0]
}

export const getAllMessages = async (apikeys) => {
  const { publicKey, secretKey } = apikeys
  const d = getTS()
  const messages = []
  const campaigns = []
  const contacts = []
  const messagesList = await mailjetGet('message', publicKey, secretKey, {
    Limit,
    FromType: 'Transactional',
    FromTS: d,
  })
  for (let i = 0; i < messagesList.length; i++) {
    let campaignInformation = {}
    let contactInformation = {}
    const campaignIndex = campaigns.findIndex((campaign) => {
      return campaign.campaignID === messagesList[i].CampaignID
    })
    if (campaignIndex === -1) {
      campaignInformation = await getMessageCampaignInformation(apikeys, messagesList[i].CampaignID)
      campaigns.push(campaignInformation)
    } else {
      campaignInformation = campaigns[campaignIndex]
    }
    const contactIndex = contacts.findIndex((contact) => {
      return contact.contactID === messagesList[i].ContactID
    })
    if (campaignIndex === -1) {
      contactInformation = await getMessageContactInformation(apikeys, messagesList[i].ContactID)
      contacts.push(contactInformation)
    } else {
      contactInformation = contacts[contactIndex]
    }
    messages.push({
      messageID: messagesList[i].ID,
      status: messagesList[i].Status,
      ...campaignInformation,
      ...contactInformation
    })
  }
  return messages
}

const getMessageCampaignInformation = async (apikeys, campaignID) => {
  const { publicKey, secretKey } = apikeys
  const campaigns = await mailjetGet(`campaign/${campaignID}`, publicKey, secretKey)
  const splittedDate = campaigns[0].SendEndAt.split('T')
  const date = splittedDate[0].split('-')
  const formattedDate = `${months[parseInt(date[1], 10) - 1]} ${date[2]}, ${date[0]} at ${splittedDate[1].replace('Z', ' UTC')}`
  const information = {
    campaignID,
    fromEmail: campaigns[0].FromEmail,
    fromName: campaigns[0].FromName,
    opened: campaigns[0].OpenTracked,
    sentAt: formattedDate,
    subject: campaigns[0].Subject,
  }
  return information
}

const getMessageContactInformation = async (apikeys, contactID) => {
  const { publicKey, secretKey } = apikeys
  const contactData = await mailjetGet(`contact/${contactID}`, publicKey, secretKey)
  const information = {
    contactID,
    toEmail: contactData[0].Email
  }
  return information
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
    contacts.push({
      id: contact[0].ID,
      email: contact[0].Email
    })
  }
  return contacts
}
