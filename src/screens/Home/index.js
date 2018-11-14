import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'
import { Icon } from 'native-base'
import DashboardNavigator from '../Dashboard'
import CampaignsNavigator from '../Campaigns/'
import ContactsNavigator from '../ContactLists'
import Login from '../Login'
import SettingsGear from '../../components/SettingsGear'
import LoadingState from '../../components/LoadingState'

@connect(state => ({
  apikeys: state.apikeys,
  previewIsFullSize: state.preview.previewIsFullSize,
}))

export default class Home extends React.Component {
  static propTypes = {
    apikeys: PropTypes.objectOf(PropTypes.any).isRequired,
    previewIsFullSize: PropTypes.bool.isRequired,
  }

  render() {
    const { apikeys, previewIsFullSize } = this.props
    let companyName = ''

    if (apikeys.get(0)) {
      companyName = apikeys.get(0).name
      companyName = companyName === 'user' ? 'My account' :
        companyName.length > 29 ? companyName.substring(0, 30).concat('...') : companyName
    }

    return (
      <SafeAreaView
        style={{ flex: 1 }}
      >
        {apikeys === 'undefined' ? (<LoadingState type="login" />) :
          apikeys.size === 0 ? (<Login />) : (
            <View style={{ flex: 1 }}>
              {previewIsFullSize === false && (
                <View style={style.header}>
                  <Text style={style.company}>{companyName}</Text>
                  <SettingsGear />
                </View>
              )}
              <CustomTabs />
            </View>
        )}
      </SafeAreaView>
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


const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  company: {
    paddingLeft: 10,
    fontSize: 20,
    fontFamily: 'System',
    fontWeight: 'bold',
  },
})
