import React from 'react'
import { StackNavigator } from 'react-navigation'
import Messages from './Messages'
import SettingsGear from '../../components/SettingsGear'

const MessagesNavigator = StackNavigator({
  MessagesLists: {
    screen: Messages,
    navigationOptions: {
      title: 'Transactional Activity',
      headerRight: <SettingsGear />,
      headerStyle: {
        backgroundColor: '#fead0d',
      },
      headerTintColor: '#fff',
    },
  },
})

export default MessagesNavigator
