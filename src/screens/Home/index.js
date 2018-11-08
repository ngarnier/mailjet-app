import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import { TabNavigator, TabBarBottom } from 'react-navigation'
import { Icon } from 'native-base'
import DashboardNavigator from '../Dashboard'
import CampaignsNavigator from '../Campaigns/'
import ContactsNavigator from '../ContactLists'
import Login from '../Login'
import SettingsGear from '../../components/SettingsGear'

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
    let companyName = apikeys.get(0).name
    companyName = companyName === 'user' ? 'My account' :
      companyName.length > 29 ? companyName.substring(0, 30).concat('...') : companyName

    if (!apikeys.get(0)) {
      return <Login />
    }
    return (
      <SafeAreaView
        style={{ flex: 1 }}
      >
        <View style={style.header}>
          <Text style={style.company}>{companyName}</Text>
          <SettingsGear />
        </View>
        <CustomTabs />
      </SafeAreaView>
    )
  }
}

const CustomTabs = TabNavigator({
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
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: '#1FBE9F',
    inactiveTintColor: '#9a9b9f',
    showIcon: true,
    labelStyle: {
      fontSize: 14,
    },
    style: {
      height: 65,
      backgroundColor: '#fefefe',
    },
  },
})


const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  company: {
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: '300',
  },
})
