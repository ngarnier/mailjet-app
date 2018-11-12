import React from 'react'
import PropTypes from 'prop-types'
import { View, FlatList, TouchableOpacity } from 'react-native'
import EmptyState from '../../components/EmptyState'
import MessageRow from '../../components/MessageRow'
import LoadingState from '../../components/LoadingState'

export default function CampaignsList({
  navigation,
  campaigns,
  isLoading,
  isRefreshing,
  refresh,
}) {
  return (
    <View style={{ flex: 1 }}>
      {isLoading && !isRefreshing ? (
        <LoadingState type="campaigns" />
      ) : !campaigns ? (
        <View />
      ) : typeof campaigns === 'string' ? (
        <View style={{ flex: 1 }}>
          <EmptyState tryAgain={() => refresh('update')} state="network-issue" context="Campaigns" />
        </View>
      ) : campaigns.length === 0 ? (
        <View style={{ flex: 1 }}>
          <EmptyState state="no-data" context="Campaigns" />
        </View>
      ) : (
        <FlatList
          data={campaigns}
          keyExtractor={(item, index) => index.toString()}
          refreshing={isRefreshing}
          onRefresh={() => refresh('refresh')}
          onEndReachedThreshold={0.1}
          onEndReached={() => refresh('load more')}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Campaign', {
                id: item.id,
                title: item.title,
                delivered: item.delivered,
                opened: item.opened,
                clicked: item.clicked,
                status: item.status,
              })}
            >
              <MessageRow
                title={item.title}
                subtitle={item.subject}
                status={item.status}
                date={item.date}
                navigation={navigation}
              />
            </TouchableOpacity>
        )}
        />
      )}
    </View>

  )
}

CampaignsList.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  campaigns: PropTypes.any.isRequired,
  /* eslint-enable */
  isLoading: PropTypes.bool.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
}
