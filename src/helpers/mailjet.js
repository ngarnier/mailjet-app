import { Buffer } from 'buffer'
import { getTS, formatTime } from './util'

const Limit = 40
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

export const convertTimestamp = (timestamp) => {
  const date = new Date(timestamp)
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} at ${formatTime(date.getHours())}h${formatTime(date.getMinutes())} UTC`
}

export const timeOutCheck = delay =>
  new Promise(resolve => setTimeout(resolve, delay, 'The request timed out'))

const mailjetGetRequest = (route, formattedFilters, encodedKeys) =>
  fetch(`https://api.mailjet.com/v3/REST/${route}${formattedFilters}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${encodedKeys}`,
    },
  })

export const mailjetGet = async (route, publicKey, secretKey, filters) => {
  const encodedKeys = await Buffer.from(`${publicKey}:${secretKey}`).toString('base64')
  let formattedFilters = ''

  if (filters) {
    formattedFilters = '?'
    for (let i = 0; i < Object.keys(filters).length; i += 1) {
      if (i === Object.keys(filters).length - 1) {
        formattedFilters += `${Object.keys(filters)[i]}=${filters[Object.keys(filters)[i]]}`
      } else {
        formattedFilters += `${Object.keys(filters)[i]}=${filters[Object.keys(filters)[i]]}&`
      }
    }
  }

  const response = await Promise.race([
    mailjetGetRequest(route, formattedFilters, encodedKeys),
    timeOutCheck(5000),
  ])

  const res = typeof response === 'string' ? 'timed out' : await response.json()
  if (typeof res === 'string') {
    return undefined
  } else if (res.ErrorMessage) {
    return res.ErrorMessage
  }
  return res.Data
}

export const checkAuth = async (publicKey, secretKey) => {
  const auth = await Promise.race([
    mailjetGet('template', publicKey, secretKey),
    timeOutCheck(5000),
  ])
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
  if (!keyData) {
    return 'The request timed out'
  }
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
  const information = {
    campaignID,
    fromEmail: campaigns[0].FromEmail,
    fromName: campaigns[0].FromName,
    opened: campaigns[0].OpenTracked,
    sentAt: Date.parse(campaigns[0].SendEndAt),
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

export const getAllMessages = async (apikeys, statusFilter = 'All') => {
  const { publicKey, secretKey } = apikeys
  const d = getTS()
  const messages = []
  const campaignIDs = []
  const contactIDs = []
  const campaigns = []
  const contacts = []
  const messagesList = statusFilter === 'All' ?
    await mailjetGet('message', publicKey, secretKey, {
      Limit,
      FromType: 'Transactional',
      FromTS: d,
    }) :
    await mailjetGet('message', publicKey, secretKey, {
      Limit,
      FromType: 'Transactional',
      FromTS: d,
      MessageStatus: statusFilter,
    })

  if (!messagesList) {
    return 'The request timed out'
  }

  for (let i = 0; i < messagesList.length; i += 1) {
    const campaignID = messagesList[i].CampaignID
    const contactID = messagesList[i].ContactID
    const campaignAlreadyFetched = campaignIDs.find(id => id === campaignID)
    const contactAlreadyFetched = contactIDs.find(id => id === contactID)

    if (!campaignAlreadyFetched) {
      campaignIDs.push(campaignID)
      campaigns.push(getMessageCampaignInformation(apikeys, messagesList[i].CampaignID))
    }

    if (!contactAlreadyFetched) {
      contactIDs.push(contactID)
      contacts.push(getMessageContactInformation(apikeys, messagesList[i].ContactID))
    }
  }

  const resolvedCampaigns = await Promise.race([
    Promise.all(campaigns),
    timeOutCheck(5000),
  ])
  if (typeof resolvedCampaigns === 'string') {
    return 'The request timed out'
  }
  const resolvedContacts = await Promise.race([
    Promise.all(contacts),
    timeOutCheck(5000),
  ])
  if (typeof resolvedContacts === 'string') {
    return 'The request timed out'
  }

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

export const getLists = async (apikey, offset = 0) => {
  const { publicKey, secretKey } = apikey
  return mailjetGet('contactslist', publicKey, secretKey, {
    Limit: 40,
    Offset: offset,
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
