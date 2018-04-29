import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import CampaignDetails from './CampaignDetails'
import EmptyState from '../EmptyState'
import { getCampaignDetails } from '../../helpers/mailjet'

@connect(state => ({
  apikeys: state.apikeys
}))

export default class Campaign extends React.Component {
  state = {}

  componentDidMount = async () => {
    const { apikeys } = this.props
    const { id, title, delivered, opened, clicked } = this.props.navigation.state.params

    this.setState({
      isLoading: true,
    })

    const campaignDetails = await getCampaignDetails(apikeys.get(0), id)
    this.setState({
      campaignDetails: { ...campaignDetails, title, delivered, opened, clicked },
      isLoading: false,
    })
  }

  render() {
    const { campaignDetails, isLoading } = this.state

    return (
      <View>
        {campaignDetails ? (
          <CampaignDetails campaignDetails={campaignDetails} />
        ) : isLoading ? (
          <EmptyState state={'loading'} context={'Campaign details'} />
        ) : (
          <EmptyState state={'no-data'} context={'Campaign details'} />
        )}
      </View>
    )
  }
}
