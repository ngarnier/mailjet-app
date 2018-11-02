import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { TabNavigator, TabBarBottom } from 'react-navigation'
import { Icon } from 'native-base'
import CampaignsNavigator from '../Campaigns/'
import ContactsNavigator from '../ContactLists'
import Login from '../Login'

@connect(state => ({
  apikeys: state.apikeys,
}))

export default class Home extends React.Component {
  static propTypes = {
    apikeys: PropTypes.objectOf(PropTypes.any),
  }

  static defaultProps = {
    apikeys: [],
  }
  render() {
    const { apikeys } = this.props
    console.log(apikeys)
    if (!apikeys.get(0)) {
      return <Login />
    }
    return <CustomTabs />
  }
}

const CustomTabs = TabNavigator({
  Campaigns: {
    screen: CampaignsNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="mail" style={{ color: tintColor }} />,
    },
  },
  Contacts: {
    screen: ContactsNavigator,
    navigationOptions: {
      title: 'Contacts',
      tabBarIcon: ({ tintColor }) => <Icon name="contacts" style={{ color: tintColor }} />,
    },
  },
}, {
  swipeEnabled: true,
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: '#333',
    inactiveTintColor: '#9a9b9f',
    showIcon: true,
    labelStyle: {
      fontSize: 12,
    },
    style: {
      backgroundColor: '#fefefe',
    },
  },
})
