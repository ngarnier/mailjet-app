import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Icon } from 'native-base'
import DashboardNavigator from '../Dashboard'
import CampaignsNavigator from '../Campaigns/'
import ContactsNavigator from '../ContactLists'
import Login from '../Login'
import LoadingState from '../../components/LoadingState'

@connect(state => ({
  apikeys: state.apikeys,
}))

export default class Home extends React.Component {
  static propTypes = {
    apikeys: PropTypes.objectOf(PropTypes.any).isRequired,
  }

  render() {
    const { apikeys } = this.props

    return (
      <View style={{ flex: 1 }} >
        {apikeys === 'undefined' ? (<LoadingState type="login" />) :
          apikeys.size === 0 ? (<Login />) : (
            <CustomTabs />
        )}
      </View>
    )
  }
}

const CustomTabs = createBottomTabNavigator({
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
  lazy: false,
  swipeEnabled: false,
  tabBarOptions: {
    safeAreaInset: { top: 'never', bottom: 'never' },
    activeTintColor: '#1FBE9F',
    inactiveTintColor: '#9a9b9f',
    showIcon: true,
    labelStyle: {
      fontSize: 14,
    },
    style: {
      height: 56,
      backgroundColor: '#fefefe',
    },
  },
})

