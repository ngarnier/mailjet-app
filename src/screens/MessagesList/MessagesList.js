import React from 'react'
import PropTypes from 'prop-types'
import { FlatList, View, ActivityIndicator, StyleSheet } from 'react-native'
import MessageRow from '../../components/MessageRow'
import EmptyState from '../../components/EmptyState'
import { convertTimestamp } from '../../helpers/mailjet'

export default function MessagesList({
  messages,
  isLoading,
  isRefreshing,
  refresh,
}) {
  return (
    <View style={{ flex: 1 }}>
      {!messages ? (
        <View />
      ) : typeof messages === 'string' ? (
        <View style={{ flex: 1 }}>
          <EmptyState tryAgain={() => refresh('update')} state="network-issue" context="Messages" />
        </View>
      ) : messages.length === 0 ? (
        <View style={{ flex: 1 }}>
          <EmptyState state="no-data" context="Messages" />
        </View>
      ) : (
        <FlatList
          data={messages.sort((a, b) => b.sentAt - a.sentAt)}
          keyExtractor={(item, index) => index.toString()}
          refreshing={isRefreshing}
          onRefresh={() => refresh('refresh')}
          initialNumToRender={10}
          renderItem={({ item }) => (
            <MessageRow
              title={item.subject}
              subtitle={
                `From: ${item.fromName} (${item.fromEmail})\nTo: ${item.toEmail}\nSent on ${convertTimestamp(item.sentAt)}`
              }
              status={item.status}
            />
          )}
        />
      )}
      {isLoading && !isRefreshing && (
        <View style={style.loading}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  )
}

MessagesList.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  messages: PropTypes.any.isRequired,
  /* eslint-enable */
  isLoading: PropTypes.bool.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
}

const style = StyleSheet.create({
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

