import { Buffer } from 'buffer'
import { getKeyDetails } from './apikey'
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
  return ("couldn't find the key!")
}

const getEncodedKeys = (publicKey, secretKey) => {
  return Buffer(`${publicKey}:${secretKey}`).toString('base64')
}

export const mailjetGet = async (route, publicKey, secretKey, filters) => {
  const encodedKeys = await getEncodedKeys(publicKey, secretKey)
  let formattedFilters = ''
  if (filters) {
    formattedFilters = '?'
    for (filter in filters) {
      formattedFilters += `${filter}=${filters[filter]}&`
    }
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

export const getStats = async (publicKeys) => {
  const stats = []
  const campaignIDs = []
  for (let i = 0; i < publicKeys.length; i++) {
    const { secretKey } = await getKeyDetails(publicKeys[i])
    const d = getTS()
    const campaigns = await mailjetGet('campaign', publicKeys[i], secretKey, {
      FromTS: d
    })
    campaigns.Data.map((e) => {
      campaignIDs.push({
        id: e.ID,
        subject: e.Subject,
      })
    })
    if (i === publicKeys.length - 1) {
      for (let j = 0; j < campaignIDs.length; j++) {
        const campaignStats = await mailjetGet('statcounters', publicKeys[i], secretKey, {
          CounterSource: 'Campaign',
          SourceID: campaignIDs[j].id,
          CounterResolution: 'Lifetime',
          CounterTiming: 'Message',
        })
        const counter = campaignStats.Data[0]
        if (counter.MessageSentCount) {
          stats.push({
            id: campaignIDs[j].id,
            name: campaignIDs[j].subject,
            sent: counter.MessageSentCount,
            opens: `${Math.floor((counter.MessageOpenedCount / counter.MessageSentCount) * 100)}%`,
            clicks: `${Math.floor((counter.MessageClickedCount / counter.MessageSentCount) * 100)}%`
          })
        }
      }
    }
  }
  return stats
}

