import React from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView, View, ActivityIndicator, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import FilterRow from '../../components/FilterRow'
import Picker from '../../components/Picker'
import MessagesList from './MessagesList'
import { getAllMessages } from '../../helpers/mailjet'

@connect(state => ({
  apikeys: state.apikeys,
  filter: state.filters.messages,
}))

export default class Messages extends React.Component {
  static propTypes = {
    filter: PropTypes.string.isRequired,
  }

  state = {
    messages: [],
    isLoading: false,
    isLoadingMore: false,
    isRefreshing: false,
    offset: 0,
    canLoadMore: true,
  }

  componentDidMount = async () => {
    const { apikeys, filter } = this.props

    this.setState({
      isLoading: true,
    })

    const messages = await getAllMessages(apikeys.get(0), filter)

    this.setState({
      messages,
      isLoading: false,
      canLoadMore: messages.length === 20,
    })
  }

  fetchMessages = async (method) => {
    const { apikeys, filter } = this.props
    const { offset, messages, canLoadMore } = this.state

    if (method === 'update') {
      this.setState({
        offset: 0,
        isLoading: true,
      })

      const updatedMessages = await getAllMessages(apikeys.get(0), filter)

      this.setState({
        messages: updatedMessages,
        isLoading: false,
        isLoadingMore: false,
        canLoadMore: updatedMessages.length === 20,
      })
    } else if (method === 'load more' && canLoadMore) {
      this.setState({
        isLoadingMore: true,
      })

      const newMessages = await getAllMessages(apikeys.get(0), filter, offset + 20)
      console.log(newMessages.length)

      if (typeof newMessages === 'object') {
        this.setState({
          messages: [...messages, ...newMessages],
          offset: offset + 20,
          canLoadMore: newMessages.length === 20,
          isLoadingMore: false,
        })
      }
    } else if (method === 'refresh') {
      this.setState({
        isRefreshing: true,
      })

      const refreshedMessages = await getAllMessages(apikeys.get(0), filter)

      this.setState({
        messages: refreshedMessages,
        isRefreshing: false,
        isLoadingMore: false,
        canLoadMore: refreshedMessages.length === 20,
      })
    }
  }

  render() {
    const { filter } = this.props
    const {
      messages, isLoading, isLoadingMore, isRefreshing,
    } = this.state

    return (
      <SafeAreaView style={style.container}>
        <FilterRow filter={filter} context="messages" />
        <MessagesList
          refresh={method => this.fetchMessages(method)}
          messages={messages}
          filter={filter}
          isLoading={isLoading}
          isRefreshing={isRefreshing}
        />
        {isLoadingMore && (
          <View style={style.loader}>
            <ActivityIndicator size="large" />
          </View>
        )}
        <Picker pick={() => this.fetchMessages('update')} context="messages" />
      </SafeAreaView>
    )
  }
}

const style = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#f6f6f6',
    flex: 1,
  },
  loader: {
    paddingTop: 10,
    paddingBottom: 10,
  },
})

