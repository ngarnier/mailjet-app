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
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.title}`,
    }),
  },
}, {
  navigationOptions: {
    headerForceInset: { top: 'never' },
    headerStyle: {
      backgroundColor: '#fff',
    },
  },
})

export default CampaignsNavigator
