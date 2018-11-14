import React from 'react'
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'
import { Icon } from 'native-base'
import DashboardNavigator from '../Dashboard'
import CampaignsNavigator from '../Campaigns/'
import ContactsNavigator from '../ContactLists'

const Home = createBottomTabNavigator({
  Dashboard: {
    screen: DashboardNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="dashboard" type="Octicons" style={{ color: tintColor }} />,
    },
  },
  Campaigns: {
    screen: CampaignsNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="envelope-letter" type="SimpleLineIcons" style={{ color: tintColor }} />,
    },
  },
  Contacts: {
    screen: ContactsNavigator,
    navigationOptions: {
      title: 'Contacts',
      tabBarIcon: ({ tintColor }) => <Icon name="people" type="SimpleLineIcons" style={{ color: tintColor }} />,
    },
  },
}, {
  swipeEnabled: false,
  tabBarComponent: BottomTabBar,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    safeAreaInset: { bottom: 'never' },
    activeTintColor: '#1FBE9F',
    inactiveTintColor: '#9a9b9f',
    showIcon: true,
    labelStyle: {
      fontSize: 14,
    },
    style: {
      backgroundColor: '#fefefe',
    },
  },
})

export default Home
