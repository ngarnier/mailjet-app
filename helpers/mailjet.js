import { Buffer } from 'buffer'
import { convertTimestamp, getMonthTS, getWeekTS, getDayTS } from './util'

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

export const mailjetGet = async (route, publicKey, secretKey, filters, request = 'Data') => {
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
  return res[request]
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
        id: response[i].ID,
        publicKey: response[i].APIKey,
        secretKey: response[i].SecretKey,
      }
    }
  }
  return "Couldn't authenticate with those keys"
}

const getCampaigns = async (apikey, filter, offset) => {
  const { publicKey, secretKey } = apikey
  let res
  if (filter === 'Drafts') {
    res = await mailjetGet('campaignoverview', publicKey, secretKey, {
      Limit: 20,
      Offset: offset,
      Drafts: true,
    })
  } else {
    res = await mailjetGet('campaignoverview', publicKey, secretKey, {
      Limit: 20,
      Offset: offset,
      IDType: 'Campaign',
    })
  }
  return res
}

export const getAllCampaigns = async (apikeys, filter, offset = 0) => {
  const campaigns = []
  const keyData = await getCampaigns(apikeys, filter, offset)

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
      date = convertTimestamp(timestamp * 1000)
    }
    campaigns.push({
      title: e.Title,
      subject: e.Subject,
      status,
      id: e.ID,
      date,
      delivered: e.DeliveredCount,
      opened: `${e.DeliveredCount === 0 ? 0 : Math.floor((e.OpenedCount / e.DeliveredCount) * 100)}%`,
      clicked: `${e.OpenedCount === 0 ? 0 : Math.floor((e.ClickedCount / e.OpenedCount) * 100)}%`,
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

export const getLists = async (apikey, offset = 0) => {
  const { publicKey, secretKey } = apikey
  const response = await mailjetGet('contactslist', publicKey, secretKey, {
    Limit: 40,
    Offset: offset,
    isDeleted: false,
    Sort: 'Name',
  })
  if (!response) {
    return 'The request timed out'
  }
  return response
}

export const getListStats = async (apikey, id) => {
  const { publicKey, secretKey } = apikey
  const stats = await mailjetGet('statcounters', publicKey, secretKey, {
    SourceID: id,
    CounterSource: 'List',
    CounterResolution: 'Lifetime',
    CounterTiming: 'Message',
  })

  if (!stats || !stats[0]) {
    return undefined
  }

  const {
    MessageClickedCount,
    MessageOpenedCount,
    MessageSentCount,
    MessageUnsubscribedCount,
  } = stats[0]

  return {
    sent: MessageSentCount,
    unsub: MessageUnsubscribedCount,
    opened: `${MessageSentCount === 0 ? 0 : Math.floor((MessageOpenedCount / MessageSentCount) * 100)}%`,
    clicked: `${MessageOpenedCount === 0 ? 0 : Math.floor((MessageClickedCount / MessageOpenedCount) * 100)}%`,
  }
}

export const getListContactIDs = async (apikeys, listName, offset) => {
  const { publicKey, secretKey } = apikeys
  return mailjetGet('listrecipient', publicKey, secretKey, {
    ListName: listName,
    Limit: 20,
    Offset: offset,
    Unsub: false,
    IgnoreDeleted: true,
  })
}

export const getListContacts = async (apikeys, listName, offset = 0) => {
  const { publicKey, secretKey } = apikeys
  const contactIDs = await getListContactIDs(apikeys, listName, offset)
  const contacts = []

  if (typeof contactIDs !== 'object') {
    return 'The request timed out'
  }

  for (let i = 0; i < contactIDs.length; i += 1) {
    const contactID = contactIDs[i].ContactID
    contacts.push(mailjetGet(`contact/${contactID}`, publicKey, secretKey))
  }

  return Promise.race([
    Promise.all(contacts),
    timeOutCheck(5000),
  ])
}

export const getContactProperties = async (apikeys, id) => {
  const { publicKey, secretKey } = apikeys
  const contactData = await mailjetGet(`contactdata/${id}`, publicKey, secretKey)

  return contactData[0].Data || 'The request timed out'
}

export const getTotalSent = async (apikeys) => {
  const { id, publicKey, secretKey } = apikeys
  let total = 0

  const stats = await mailjetGet('statcounters', publicKey, secretKey, {
    SourceID: id,
    CounterSource: 'APIKey',
    CounterResolution: 'Day',
    CounterTiming: 'Message',
    FromTS: getMonthTS(),
    CountOnly: 1,
  })

  if (!stats || typeof stats === 'string') {
    return 'The request timed out'
  }

  for (let i = 0; i < stats.length; i += 1) {
    total += stats[i].MessageSentCount
  }
  return total
}

export const getApiKeyStats = async (apikeys, period) => {
  const { id, publicKey, secretKey } = apikeys

  const stats = period === 'Day' ? await mailjetGet('statcounters', publicKey, secretKey, {
    SourceID: id,
    CounterSource: 'APIKey',
    CounterResolution: 'Hour',
    CounterTiming: 'Event',
    FromTS: getDayTS(),
  }) :
    await mailjetGet('statcounters', publicKey, secretKey, {
      SourceID: id,
      CounterSource: 'APIKey',
      CounterResolution: 'Day',
      CounterTiming: 'Event',
      FromTS: period === 'Week' ? getWeekTS() : getMonthTS(),
    })

  if (!stats || typeof stats === 'string') {
    return 'The request timed out'
  }

  return stats
}

export const getTotalContacts = async (apikeys) => {
  const { publicKey, secretKey } = apikeys

  const total = await mailjetGet('contact', publicKey, secretKey, {
    countOnly: 1,
  }, 'Total')

  if (typeof total !== 'number') {
    return 'The request timed out'
  }

  return total
}

export const getLastCampaign = async (apikeys) => {
  const { publicKey, secretKey } = apikeys

  const lastCampaign = await mailjetGet('campaignoverview', publicKey, secretKey, {
    Limit: 1,
    IDType: 'Campaign',
  })

  if (typeof lastCampaign !== 'object' || lastCampaign.length === 0) {
    return 'The request timed out'
  }

  return {
    id: lastCampaign[0].ID,
    subject: lastCampaign[0].Subject,
    title: lastCampaign[0].Title,
    delivered: lastCampaign[0].DeliveredCount,
    status: lastCampaign[0].ProcessedCount > 0 ? 'Sent' : 'Draft',
    sent: lastCampaign[0].DeliveredCount,
    opened: `${lastCampaign[0].DeliveredCount === 0 ? 0 : Math.floor((lastCampaign[0].OpenedCount / lastCampaign[0].DeliveredCount) * 100)}%`,
    clicked: `${lastCampaign[0].OpenedCount === 0 ? 0 : Math.floor((lastCampaign[0].ClickedCount / lastCampaign[0].OpenedCount) * 100)}%`,
  }
}
