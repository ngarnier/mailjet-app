import React from 'react'
import PropTypes from 'prop-types'
import { FlatList, TouchableOpacity } from 'react-native'
import MessageRow from '../../components/MessageRow'

export default function CampaignsList({ navigation, campaigns }) {
  return (
    <FlatList
      data={campaigns}
      keyExtractor={(item, index) => index.toString()}
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
  )
}

CampaignsList.propTypes = {
  campaigns: PropTypes.string.isRequired,
}
