import React from 'react'
import { connect } from 'react-redux'
import { removeApiKey } from '../../actions/apikeys'
import { TabNavigator, TabBarBottom } from 'react-navigation'
import { Icon } from 'native-base'
import MessagesNavigator from '../MessagesList'
import CampaignsNavigator from '../Campaigns/'
import ContactsNavigator from '../ContactLists'

@connect(state => ({
  apikeys: state.apikeys
}), {
  removeApiKey
})

export default class Home extends React.Component {
  render() {
    return (
      <CustomTabs />
    )
  }
}

const CustomTabs = TabNavigator({
  Campaigns: {
    screen: CampaignsNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="mail" style={{ color: tintColor }} />
    }
  },
  Transactional: {
    screen: MessagesNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="stats" style={{ color: tintColor }} />
    }
  },
  Contacts: {
    screen: ContactsNavigator,
    navigationOptions: {
      title: 'Contacts',
      tabBarIcon: ({ tintColor }) => <Icon name="contacts" style={{ color: tintColor }} />
    }
  }
}, {
  swipeEnabled: true,
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: '#de980f',
    inactiveTintColor: '#747579',
    showIcon: true,
    labelStyle: {
      fontSize: 12,
    },
    style: {
      backgroundColor: '#fff',
    },
  },
})
