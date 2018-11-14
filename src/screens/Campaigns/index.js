import React from 'react'
import { createStackNavigator } from 'react-navigation'
import LogOut from '../../components/LogOut'
import Campaigns from './Campaigns'
import Campaign from './Campaign'

const CampaignsNavigator = createStackNavigator({
  Campaigns: {
    screen: Campaigns,
    navigationOptions: {
      title: 'Campaigns',
    },
  },
  Campaign: {
    screen: Campaign,
  },
}, {
  headerMode: 'screen',
  navigationOptions: {
    headerRight: (<LogOut />),
    headerForceInset: { top: 'never' },
    headerStyle: {
      backgroundColor: '#fff',
    },
    headerTitleStyle: {
      color: '#000',
    },
    headerBackTitleStyle: {
      color: '#1FBE9F',
    },
    headerTintColor: '#1FBE9F',
  },
})

export default CampaignsNavigator

