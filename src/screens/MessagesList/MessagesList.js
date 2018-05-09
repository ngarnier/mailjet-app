import React from 'react'
import { SafeAreaView, FlatList, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import MessageRow from '../../components/MessageRow'
import EmptyState from '../../components/EmptyState'
import { getAllMessages } from '../../helpers/mailjet'

@connect(state => ({
  apikeys: state.apikeys,
}))

export default class MessagesList extends React.Component {
  state = {
    messages: [],
  }

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
      <SafeAreaView style={style.container}>
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
        ) : !messages && !isLoading && (
          <View>
            <EmptyState state="no-data" context="Messages" navigation={this.props.navigation} />
          </View>
        )}
      </SafeAreaView>
    )
  }
}

const style = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#f6f6f6',
  },
})

