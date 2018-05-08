import { StackNavigator } from 'react-navigation'
import Campaigns from './Campaigns'
import Campaign from '../Campaign'

const CampaignsNavigator = StackNavigator({
  Campaigns: {
    screen: Campaigns,
    navigationOptions: {
      title: 'Campaigns',
      headerStyle: {
        backgroundColor: '#ffbf40',
      },
      headerTintColor: '#fff',
    },
  },
  Campaign: {
    screen: Campaign,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#ffbf40',
      },
      headerTintColor: '#fff',
    },
  },
})

export default CampaignsNavigator
