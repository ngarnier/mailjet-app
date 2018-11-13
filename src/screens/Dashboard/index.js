import React from 'react'
import { connect } from 'react-redux'
import { createMaterialTopTabNavigator } from 'react-navigation'
import Explore from './Explore'
import Overview from './Overview'

@connect(state => ({
  apikeys: state.apikeys,
}))

export default class DashboardNavigator extends React.Component {
  render() {
    return (<DashboardTabs />)
  }
}

const DashboardTabs = createMaterialTopTabNavigator({
  Overview: {
    screen: Overview,
  },
  Explore: {
    screen: Explore,
  },
}, {
  swipeEnabled: true,
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
      fontSize: 18,
      fontWeight: 'bold',
    },
    style: {
      backgroundColor: '#fefefe',
    },
  },
})
