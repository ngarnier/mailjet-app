import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View } from 'react-native'
import CampaignDetails from './CampaignDetails'
import EmptyState from '../../../components/EmptyState'
import { getCampaignDetails } from '../../../helpers/mailjet'
import LoadingState from '../../../components/LoadingState'

@connect(state => ({
  apikeys: state.apikeys,
  previewIsFullSize: state.preview.previewIsFullSize,
}))

export default class Campaign extends React.Component {
  static propTypes = {
    previewIsFullSize: PropTypes.bool.isRequired,
  }

  static navigationOptions = ({ navigation }) => (navigation.state.params.previewIsFullSize ? {
    title: navigation.state.params.title,
    tabBarVisible: false,
    header: null,
  } : {
    title: navigation.state.params.title,
    tabBarVisible: false,
  })

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

  shouldComponentUpdate(nextProps) {
    if (this.props.previewIsFullSize !== nextProps.previewIsFullSize) {
      this.props.navigation.setParams({
        previewIsFullSize: nextProps.previewIsFullSize,
      })
    }
    return true
  }

  render() {
    const { campaignDetails, isLoading } = this.state

    console.log(campaignDetails)

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
          <LoadingState />
        ) : (
          <EmptyState state="no-data" context="Campaign details" />
        )}
      </View>
    )
  }
}
