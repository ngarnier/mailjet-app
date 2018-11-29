import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Asset, AppLoading } from 'expo'
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

  state = {
    isReady: false,
  }

  cacheResourcesAsync = async () => {
    const images = [
      /* eslint-disable global-require */
      require('../../img/jet.png'),
      /* eslint-enable */
    ]

    const cacheImages = images.map(image => Asset.fromModule(image).downloadAsync())
    return Promise.all(cacheImages)
  }

  render() {
    const { apikeys } = this.props

    if (!this.state.isReady || apikeys === 'undefined') {
      return (
        <AppLoading
          startAsync={this.cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
        />
      )
    }

    return (
      <View style={{ flex: 1 }} >
        {apikeys.size === 0 ? (<Login />) : (<CustomTabs />)}
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

