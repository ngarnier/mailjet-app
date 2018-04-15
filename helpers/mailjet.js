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

const getCampaigns = async (apikey, d) => {
  const { publicKey, secretKey } = apikey
  const { Data } = await mailjetGet('campaign', publicKey, secretKey, {
    FromTS: d,
  })
  return Data
}

export const getAllCampaigns = async (apikeys) => {
  const campaigns = []
  const d = getTS()
  for (let i = 0; i < apikeys.size; i++) {
    const { publicKey, secretKey } = apikeys.get(i)
    const keyData = await getCampaigns(apikeys.get(i), d)
    const keyCampaigns = keyData.filter(campaign => campaign.NewsLetterID !== 0)
    keyCampaigns.map((e) => {
      campaigns.push({
        publicKey,
        secretKey,
        id: e.ID,
        subject: e.Subject
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
    opens: `${Math.floor((counter.MessageOpenedCount / counter.MessageSentCount) * 100)}%`,
    clicks: `${Math.floor((counter.MessageClickedCount / counter.MessageSentCount) * 100)}%`
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

export const getStats = async (apikeys) => {
  const stats = []
  const campaignIDs = []


  for (let i = 0; i < apikeys.length; i++) {
    const { publicKey, secretKey } = apikeys[i]
    console.log(apikeys[i].get('publicKey'))
    const d = getTS()
    const campaigns = await mailjetGet('campaign', publicKey, secretKey, {
      FromTS: d
    })
    campaigns.Data.map((e) => {
      campaignIDs.push({
        id: e.ID,
        subject: e.Subject,
      })
    })
    if (i === apikeys.length - 1) {
      for (let j = 0; j < campaignIDs.length; j++) {
        const campaignStats = await mailjetGet('statcounters', publicKey, secretKey, {
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

