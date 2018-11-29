import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { SafeAreaView, View, StyleSheet } from 'react-native'
import Pick from '../../components/Pick'
import CampaignsList from './CampaignsList'
import { getAllCampaigns } from '../../helpers/mailjet'

@connect(state => ({
  apikeys: state.apikeys,
  filter: state.filters.campaigns,
}))

export default class Campaigns extends React.Component {
  static propTypes = {
    filter: PropTypes.string.isRequired,
  }

  state = {
    campaigns: [],
    isLoading: false,
    isRefreshing: false,
    offset: 0,
    canLoadMore: true,
  }

  componentDidMount = async () => {
    const { apikeys, filter } = this.props

    this.setState({
      isLoading: true,
    })

    const campaigns = await getAllCampaigns(apikeys.get(0), filter)

    this.setState({
      campaigns,
      isLoading: false,
      canLoadMore: typeof campaigns === 'object' ? campaigns.length === 20 : false,
    })
  }

  fetchMessages = async (method) => {
    const { apikeys, filter } = this.props
    const { offset, campaigns, canLoadMore } = this.state

    if (method === 'update') {
      this.setState({
        offset: 0,
        isLoading: true,
      })

      const updatedCampaigns = await getAllCampaigns(apikeys.get(0), filter)

      this.setState({
        campaigns: updatedCampaigns,
        isLoading: false,
        canLoadMore: typeof updatedCampaigns === 'object' ? updatedCampaigns.length === 20 : false,
      })
    } else if (method === 'load more' && canLoadMore) {
      const newCampaigns = await getAllCampaigns(apikeys.get(0), filter, offset + 20)

      if (typeof newCampaigns === 'object') {
        this.setState({
          campaigns: [...campaigns, ...newCampaigns],
          offset: offset + 20,
          canLoadMore: typeof newCampaigns === 'object' ? newCampaigns.length === 20 : false,
        })
      }
    } else if (method === 'refresh') {
      this.setState({
        isRefreshing: true,
      })

      const refreshedCampaigns = await getAllCampaigns(apikeys.get(0), filter)

      this.setState({
        campaigns: refreshedCampaigns,
        isRefreshing: false,
        canLoadMore: typeof refreshedCampaigns === 'object' ? refreshedCampaigns.length === 20 : false,
      })
    }
  }

  render() {
    const { navigation } = this.props
    const {
      campaigns, isLoading, isRefreshing,
    } = this.state

    return (
      <SafeAreaView style={style.container}>
        <View style={style.row}>
          <Pick pick={() => this.fetchMessages('update')} context="campaigns" />
        </View>
        <CampaignsList
          refresh={method => this.fetchMessages(method)}
          campaigns={campaigns}
          navigation={navigation}
          isLoading={isLoading}
          isRefreshing={isRefreshing}
        />
      </SafeAreaView>
    )
  }
}

const style = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#f6f6f6',
  },
  row: {
    paddingLeft: 15,
    backgroundColor: '#fff',
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: 'center',
  },
  loader: {
    paddingBottom: 10,
    backgroundColor: 'transparent',
  },
})
