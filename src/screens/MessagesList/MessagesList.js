import React from 'react'
import PropTypes from 'prop-types'
import { FlatList, View } from 'react-native'
import { connect } from 'react-redux'
import MessageRow from '../../components/MessageRow'
import EmptyState from '../../components/EmptyState'
import { getAllMessages } from '../../helpers/mailjet'

@connect(state => ({
  apikeys: state.apikeys,
  filters: state.filters,
}))

export default class MessagesList extends React.Component {
  static propTypes = {
    filters: PropTypes.objectOf(PropTypes.string).isRequired,
  }

  state = {
    messages: [],
  }

  componentDidMount = async () => {
    const { apikeys, filters } = this.props

    this.setState({
      isLoading: true,
    })

    const messages = await getAllMessages(apikeys.get(0), filters.messages)
    this.setState({
      messages: messages.length > 0 ? messages.reverse() : false,
      isLoading: false,
    })
  }

  componentDidUpdate = async () => {
    const { apikeys, filters } = this.props
    const messages = await getAllMessages(apikeys.get(0), filters.messages)
    this.setState({
      messages,
      isLoading: false,
    })
  }

  render() {
    const { messages, isLoading } = this.state
    return (
      <View>
        {messages.length > 0 ? (
          <FlatList
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <MessageRow
                title={item.subject}
                subtitle={`From: ${item.fromName} (${item.fromEmail})\nTo: ${item.toEmail}\nSent on ${item.sentAt}`}
                status={item.status}
              />
            )}
          />
        ) : isLoading ? (
          <View>
            <EmptyState state="loading" context="Messages" />
          </View>
        ) : (
          <View>
            <EmptyState state="no-data" context="Messages" />
          </View>
            )}
      </View>
    )
  }
}

