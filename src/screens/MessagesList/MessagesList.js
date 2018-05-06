import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import MessageRow from '../../components/MessageRow'
import EmptyState from '../../components/EmptyState'
import { getAllMessages } from '../../helpers/mailjet'

const style = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#f6f6f6',
  },
})

@connect(state => ({
  apikeys: state.apikeys,
}))

export default class MessagesList extends React.Component {
  state = {}

  componentDidMount = async () => {
    const { apikeys } = this.props

    this.setState({
      isLoading: true,
    })

    const messages = await getAllMessages(apikeys.get(0))
    this.setState({
      messages: messages.length > 0 ? messages.reverse() : false,
      isLoading: false,
    })
  }

  render() {
    const { messages, isLoading } = this.state
    return (
      <ScrollView style={style.container}>
        {messages && (
          <ScrollView>
            {messages.map(e => (
              <MessageRow
                title={e.subject}
                subtitle={`From: ${e.fromName} (${e.fromEmail})\nTo: ${e.toEmail}\nSent on ${e.sentAt}`}
                status={e.status}
                key={e.messageID}
              />))}
          </ScrollView>
        )}
        {isLoading && (
          <View>
            <EmptyState state="loading" context="Messages" />
          </View>
        )}
        {!messages && !isLoading && (
          <View>
            <EmptyState state="no-data" context="Messages" navigation={this.props.navigation} />
          </View>
        )}
      </ScrollView>
    )
  }
}
