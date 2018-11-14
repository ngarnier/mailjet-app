import React from 'react'
import { ScrollView, View } from 'react-native'
import fetchArticles from '../../helpers/rss'
import Article from '../../components/Article'
import LoadingState from '../../components/LoadingState'
import EmptyState from '../../components/EmptyState'

export default class Explore extends React.Component {
  state = {
    isLoading: true,
    articles: [],
  }

  componentDidMount = async () => {
    this.setState({
      isLoading: true,
    })

    const articles = await fetchArticles()

    this.setState({
      articles,
      isLoading: false,
    })
  }

  render() {
    const { isLoading, articles } = this.state

    return (
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <LoadingState />
        ) : typeof articles === 'object' ? (
          <ScrollView>
            <View style={{ paddingTop: 10, paddingBottom: 10 }}>
              {articles.map((article, index) => (
                <Article
                  key={index.toString()}
                  title={article.title}
                  description={article.description}
                  categories={article.categories}
                  link={article.link}
                />))}
            </View>
          </ScrollView>) : (<EmptyState state="network-issue" context="articles" />)}
      </View>
    )
  }
}

