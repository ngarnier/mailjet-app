import { StackNavigator } from 'react-navigation'
import CampaignsList from './CampaignsList'
import Campaign from '../Campaign'

const CampaignsNavigator = StackNavigator({
  Campaigns: {
    screen: CampaignsList,
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
