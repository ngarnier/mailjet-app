import React from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView, StyleSheet } from 'react-native'
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
    filter: PropTypes.objectOf(PropTypes.string).isRequired,
  }

  state = {
    messages: undefined,
    isLoading: false,
    isRefreshing: false,
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
    })
  }

  fetchMessages = async (method) => {
    const { apikeys, filter } = this.props

    if (method === 'update') {
      this.setState({
        isLoading: true,
      })
    } else {
      this.setState({
        isRefreshing: true,
      })
    }

    const messages = await getAllMessages(apikeys.get(0), filter)

    this.setState({
      messages,
      isLoading: false,
      isRefreshing: false,
    })
  }

  render() {
    const { messages, isLoading, isRefreshing } = this.state
    const { filter } = this.props

    return (
      <SafeAreaView style={style.container}>
        <FilterRow filter={filter} context="messages" />
        <MessagesList
          refresh={method => this.fetchMessages(method)}
          messages={messages}
          isLoading={isLoading}
          isRefreshing={isRefreshing}
        />
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
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

