import React from 'react'
import PropTypes from 'prop-types'
import { FlatList, View } from 'react-native'
import ContactListItem from './ContactListItem'
import EmptyState from '../../components/EmptyState'
import LoadingState from '../../components/LoadingState'

export default class ContactLists extends React.PureComponent {
  render() {
    const {
      lists,
      isLoading,
      isRefreshing,
      refresh,
      navigation,
    } = this.props

    return (
      <View style={{ flex: 1 }}>
        {isLoading && !isRefreshing ? (
          <LoadingState />
        ) : !lists ? (
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
            keyExtractor={(item, index) => index.toString()}
            refreshing={isRefreshing}
            onRefresh={() => refresh('refresh')}
            onEndReachedThreshold={0.1}
            onEndReached={() => refresh('load more')}
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
      </View>
    )
  }
}

ContactLists.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  lists: PropTypes.any.isRequired,
  /* eslint-enable */
  isLoading: PropTypes.bool.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
}

