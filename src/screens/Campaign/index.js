import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import CampaignDetails from './CampaignDetails'
import EmptyState from '../../components/EmptyState'
import { getCampaignDetails } from '../../helpers/mailjet'

@connect(state => ({
  apikeys: state.apikeys,
}))

export default class Campaign extends React.Component {
  state = {}

  componentDidMount = async () => {
    const { apikeys } = this.props
    const {
      id, title, delivered, opened, clicked, status,
    } = this.props.navigation.state.params

    this.setState({
      isLoading: true,
    })

    const campaignDetails = await getCampaignDetails(apikeys.get(0), id, status)
    this.setState({
      campaignDetails: {
        ...campaignDetails, title, delivered, opened, clicked, status,
      },
      isLoading: false,
    })
  }

  render() {
    const { campaignDetails, isLoading } = this.state

    return (
      <View style={{ flex: 1 }}>
        {campaignDetails ? (
          <CampaignDetails
            campaignDetails={campaignDetails}
            title={campaignDetails.title}
            subject={campaignDetails.Subject}
            fromName={campaignDetails.FromName}
            fromEmail={campaignDetails.FromEmail}
            listName={campaignDetails.ListName}
            permalink={campaignDetails.Permalink}
            delivered={campaignDetails.delivered}
            opened={campaignDetails.opened}
            clicked={campaignDetails.clicked}
            status={campaignDetails.status}
          />
        ) : isLoading ? (
          <EmptyState state="loading" context="Campaign details" />
        ) : (
          <EmptyState state="no-data" context="Campaign details" />
        )}
      </View>
    )
  }
}
