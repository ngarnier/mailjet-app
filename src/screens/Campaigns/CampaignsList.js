import React from 'react'
import PropTypes from 'prop-types'
import { View, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import EmptyState from '../../components/EmptyState'
import MessageRow from '../../components/MessageRow'

export default function CampaignsList({
  navigation,
  campaigns,
  isLoading,
  isRefreshing,
  refresh,
}) {
  return (
    <View style={{ flex: 1 }}>
      {!campaigns ? (
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
      {isLoading && !isRefreshing && (
        <View style={style.loading}>
          <ActivityIndicator size="large" />
        </View>
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

