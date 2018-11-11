import { StackNavigator } from 'react-navigation'
import Campaigns from './Campaigns'
import Campaign from './Campaign'

const CampaignsNavigator = StackNavigator({
  Campaigns: {
    screen: Campaigns,
    navigationOptions: {
      title: 'Campaigns',
    },
  },
  Campaign: {
    screen: Campaign,
  },
}, {
  headerMode: 'screen',
  navigationOptions: {
    headerForceInset: { top: 'never' },
    headerStyle: {
      backgroundColor: '#fff',
    },
  },
})

export default CampaignsNavigator

