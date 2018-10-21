import React from 'react'
import PropTypes from 'prop-types'
import { FlatList, View, ActivityIndicator, StyleSheet } from 'react-native'
import ContactListItem from './ContactListItem'
import EmptyState from '../../components/EmptyState'

export default function ContactLists({
  lists,
  isLoading,
  isRefreshing,
  refresh,
  navigation,
}) {
  return (
    <View style={{ flex: 1 }}>
      {!lists ? (
        <View />
      ) : typeof lists === 'string' ? (
        <View style={{ flex: 1 }}>
          <EmptyState tryAgain={() => refresh('update')} state="network-issue" context="Messages" />
        </View>
      ) : lists.length === 0 ? (
        <View>
          <EmptyState state="no-data" context="Contact Lists" />
        </View>
      ) : (
        <FlatList
          data={lists}
          keyExtractor={index => index.toString()}
          refreshing={isRefreshing}
          onRefresh={() => refresh('refresh')}
          renderItem={({ item }) => (
            <ContactListItem
              id={item.ID}
              name={item.Name}
              subscribers={item.SubscriberCount}
              key={item.ID}
              navigation={navigation}
            />)}
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

ContactLists.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  lists: PropTypes.any.isRequired,
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
