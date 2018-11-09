import React from 'react'
import { connect } from 'react-redux'
import { TabNavigator, TabBarTop } from 'react-navigation'
import Explore from './Explore'
import Overview from './Overview'

@connect(state => ({
  apikeys: state.apikeys,
}))

export default class DashboardNavigator extends React.Component {
  render() {
    return <DashboardTabs />
  }
}

const DashboardTabs = TabNavigator({
  Explore: {
    screen: Explore,
  },
  Overview: {
    screen: Overview,
  },
}, {
  swipeEnabled: true,
  tabBarComponent: TabBarTop,
  tabBarPosition: 'top',
  lazy: false,
  tabBarOptions: {
    indicatorStyle: {
      backgroundColor: '#1FBE9F',
    },
    pressOpacity: 1,
    activeTintColor: '#1FBE9F',
    inactiveTintColor: '#9a9b9f',
    labelStyle: {
      fontSize: 14,
    },
    style: {
      backgroundColor: '#fefefe',
    },
  },
})