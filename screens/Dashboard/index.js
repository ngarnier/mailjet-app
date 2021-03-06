import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import Explore from './Explore'
import Overview from './Overview'

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
      fontFamily: 'System',
    },
    style: {
      backgroundColor: '#fefefe',
    },
  },
})

export default DashboardTabs
