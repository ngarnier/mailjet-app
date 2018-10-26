import React from 'react'
import { SafeAreaView, View, ActivityIndicator, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import ContactLists from './ContactLists'
import { getLists } from '../../helpers/mailjet'

@connect(state => ({
  apikeys: state.apikeys,
}))

export default class Lists extends React.Component {
  state = {
    lists: [],
    isLoading: false,
    isLoadingMore: false,
    isRefreshing: false,
    offset: 0,
    canLoadMore: true,
  }

  componentDidMount = async () => {
    const { apikeys } = this.props

    this.setState({
      isLoading: true,
    })

    const lists = await getLists(apikeys.get(0))

    this.setState({
      lists,
      isLoading: false,
      isRefreshing: false,
      canLoadMore: typeof lists === 'object' ? lists.length === 40 : false,
    })
  }

  fetchLists = async (method) => {
    const { apikeys } = this.props
    const { offset, lists, canLoadMore } = this.state

    if (method === 'update') {
      this.setState({
        offset: 0,
        isLoading: true,
      })

      const updatedLists = await getLists(apikeys.get(0))

      this.setState({
        lists: updatedLists,
        isLoading: false,
        isLoadingMore: false,
        canLoadMore: typeof updatedLists === 'object' ? updatedLists.length === 40 : false,
      })
    } else if (method === 'load more' && canLoadMore) {
      this.setState({
        isLoadingMore: true,
      })
      const newLists = await getLists(apikeys.get(0), offset + 40)

      this.setState({
        lists: [...lists, ...newLists],
        offset: offset + 40,
        canLoadMore: typeof newLists === 'object' ? newLists.length === 20 : false,
        isLoadingMore: false,
      })
    } else if (method === 'refresh') {
      this.setState({
        isRefreshing: true,
      })

      const refreshedLists = await getLists(apikeys.get(0))

      this.setState({
        lists: refreshedLists,
        isRefreshing: false,
        isLoadingMore: false,
        canLoadMore: typeof refreshedLists === 'object' ? refreshedLists.length === 20 : false,
      })
    }
  }

  render() {
    const { navigation } = this.props
    const {
      lists, isLoading, isLoadingMore, isRefreshing,
    } = this.state

    return (
      <SafeAreaView style={style.container}>
        <ContactLists
          navigation={navigation}
          refresh={method => this.fetchLists(method)}
          lists={lists}
          isLoading={isLoading}
          isRefreshing={isRefreshing}
        />
        {isLoadingMore && (
          <View style={style.loader}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </SafeAreaView>
    )
  }
}

const style = StyleSheet.create({
  container: {
    height: '40%',
    backgroundColor: '#f6f6f6',
    flex: 1,
  },
  loader: {
    paddingTop: 10,
    paddingBottom: 10,
  },
})
