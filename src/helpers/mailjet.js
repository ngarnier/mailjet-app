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
    /* eslint-disable array-callback-return */
    Object.keys(filters).map((filter) => {
      formattedFilters += `${filter}=${filters[filter]}&`
    })
    /* eslint-enable */
  }
  const response = await fetch(`https://api.mailjet.com/v3/REST/${route}${formattedFilters}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${encodedKeys}`,
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
  for (let i = 0; i < response.length; i += 1) {
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

const getCampaigns = async (apikey, filter) => {
  const { publicKey, secretKey } = apikey
  let res
  if (filter === 'Drafts') {
    res = await mailjetGet('campaignoverview', publicKey, secretKey, {
      Limit,
      Drafts: true,
    })
  } else {
    res = await mailjetGet('campaignoverview', publicKey, secretKey, {
      Limit,
      IDType: 'Campaign',
    })
  }
  return res
}

export const getAllCampaigns = async (apikeys, filter) => {
  const campaigns = []
  const keyData = await getCampaigns(apikeys, filter)
  keyData.sort((a, b) => b.SendTimeStart - a.SendTimeStart)
  /* eslint-disable array-callback-return */
  keyData.map((e) => {
    const status = e.ProcessedCount > 0 ? 'Sent' : 'Draft'
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
  /* eslint-enable */
  return campaigns
}

export const getCampaignDetails = async (apikeys, id, status) => {
  const { publicKey, secretKey } = apikeys
  if (status === 'Sent') {
    const details = await mailjetGet(`campaign/${id}`, publicKey, secretKey)
    const content = await mailjetGet(`campaigndraft/${details[0].NewsLetterID}`, publicKey, secretKey)
    const listDetails = await mailjetGet(`contactslist/${details[0].ListID}`, publicKey, secretKey)
    return {
      title: details[0].Title,
      FromName: details[0].FromName,
      FromEmail: details[0].FromEmail,
      Subject: details[0].Subject,
      ListName: listDetails[0].Name,
      Permalink: content[0].Url,
    }
  }
  const content = await mailjetGet(`campaigndraft/${id}`, publicKey, secretKey)
  const listDetails = await mailjetGet(`contactslist/${content[0].ContactsListID}`, publicKey, secretKey)
  return {
    title: content[0].Title,
    FromName: content[0].SenderName,
    FromEmail: content[0].SenderEmail,
    Subject: content[0].Subject,
    ListName: listDetails[0].Name,
    Permalink: content[0].Url,
  }
}

export const getDraftCampaignDetails = async (apikeys, id) => {
  const { publicKey, secretKey } = apikeys
  const details = await mailjetGet(`campaign/${id}`, publicKey, secretKey)
  const content = await mailjetGet(`campaigndraft/${details[0].NewsLetterID}`, publicKey, secretKey)
  const listDetails = await mailjetGet(`contactslist/${details[0].ListID}`, publicKey, secretKey)
  details[0].ListName = listDetails[0].Name
  details[0].Permalink = content[0].Url
  return details[0]
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
    toEmail: contactData[0].Email,
  }
  return information
}

export const getAllMessages = async (apikeys) => {
  const { publicKey, secretKey } = apikeys
  const d = getTS()
  const messages = []
  const campaignIDs = []
  const contactIDs = []
  const campaigns = []
  const contacts = []
  const messagesList = await mailjetGet('message', publicKey, secretKey, {
    Limit,
    FromType: 'Transactional',
    FromTS: d,
  })
  for (let i = 0; i < messagesList.length; i += 1) {
    const campaignID = messagesList[i].CampaignID
    const contactID = messagesList[i].ContactID
    const campaignAlreadyFetched = campaignIDs.find(id => id === campaignID)
    if (!campaignAlreadyFetched) {
      campaignIDs.push(campaignID)
      campaigns.push(getMessageCampaignInformation(apikeys, messagesList[i].CampaignID))
    }
    const contactAlreadyFetched = contactIDs.find(id => id === contactID)
    if (!contactAlreadyFetched) {
      contactIDs.push(contactID)
      contacts.push(getMessageContactInformation(apikeys, messagesList[i].ContactID))
    }
  }
  const resolvedCampaigns = await Promise.all(campaigns)
  const resolvedContacts = await Promise.all(contacts)
  for (let i = 0; i < messagesList.length; i += 1) {
    const campaignInformation = resolvedCampaigns.find(campaign =>
      campaign.campaignID === messagesList[i].CampaignID)
    const contactInformation = resolvedContacts.find(contact =>
      contact.contactID === messagesList[i].ContactID)
    messages.push({
      messageID: messagesList[i].ID,
      status: messagesList[i].Status,
      ...campaignInformation,
      ...contactInformation,
    })
  }
  return messages
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
    ClickedCount,
  } = lists[0]
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
  for (let i = 0; i < contactIDs.length; i += 1) {
    const contactID = contactIDs[i].ContactID
    contacts.push(mailjetGet(`contact/${contactID}`, publicKey, secretKey))
  }
  const resolved = await Promise.all(contacts)
  return resolved
}
