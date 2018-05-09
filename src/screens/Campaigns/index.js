import { StackNavigator } from 'react-navigation'
import Campaigns from './Campaigns'
import Campaign from '../Campaign'

const CampaignsNavigator = StackNavigator({
  Campaigns: {
    screen: Campaigns,
    navigationOptions: {
      title: 'Campaigns',
      headerStyle: {
        backgroundColor: '#ffc94c',
      },
      headerTintColor: '#fff',
    },
  },
  Campaign: {
    screen: Campaign,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#ffc94c',
      },
      headerTintColor: '#fff',
    },
  },
})

export default CampaignsNavigator
