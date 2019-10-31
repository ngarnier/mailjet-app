import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
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

CampaignsNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  if (navigation.state.index > 0) {
    tabBarVisible = false
  }

  return {
    tabBarVisible,
  }
}

export default CampaignsNavigator

