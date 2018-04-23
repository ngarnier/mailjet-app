import React from 'react'
import { connect } from 'react-redux'
import { removeApiKey } from '../../actions/apikeys'
import { TabNavigator, TabBarBottom } from 'react-navigation'
import { Icon } from 'native-base'
import MessagesList from '../MessagesList'
import Campaigns from '../Campaigns'
import ContactsScreen from '../ContactLists'

@connect(state => ({
  apikeys: state.apikeys
}), {
  removeApiKey
})

export default class MainApp extends React.Component {
  render() {
    return (
      <CustomTabs />
    )
  }
}

const CustomTabs = TabNavigator({
  Campaigns: {
    screen: Campaigns,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (<Icon name="mail" style={{ color: tintColor }} />)
    }
  },
  Transactional: {
    screen: MessagesList,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (<Icon name="stats" style={{ color: tintColor }} />)
    }
  },
  Contacts: {
    screen: ContactsScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (<Icon name="contacts" style={{ color: tintColor }} />)
    }
  }
}, {
  swipeEnabled: true,
  title: 'Home',
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: '#292C33',
    inactiveTintColor: '#7D7E84',
    showIcon: true,
    style: {
      backgroundColor: '#EEE',
    },
  },
})
