import { parseString } from 'react-native-xml2js'

const mailjetArticlesRequest = () =>
  fetch('https://www.mailjet.com/feed/', {
    method: 'GET',
    headers: {
      Accept: 'application/rss+xml',
      'Content-Type': 'application/rss+xml',
    },
  })

const fetchArticles = async () => {
  const articles = []
  const feed = await mailjetArticlesRequest()
  const rawXml = await feed.text()
  const regex = /<img.*?src="(.*?)"/
  parseString(rawXml, (err, result) => {
    for (let i = 0; i < 5; i += 1) {
      const image = regex.exec(result.rss.channel[0].item[i].description[0])

      articles.push({
        image,
        title: result.rss.channel[0].item[i].title[0],
        link: result.rss.channel[0].item[i].link[0],
        categories: result.rss.channel[0].item[i].category,
      })
    }
  })
  return articles
}

export default fetchArticles
