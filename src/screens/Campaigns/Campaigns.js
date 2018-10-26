import React from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView, View, ActivityIndicator, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import FilterRow from '../../components/FilterRow'
import Picker from '../../components/Picker'
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
    isLoadingMore: false,
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
      canLoadMore: campaigns.length === 20,
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
        isLoadingMore: false,
        canLoadMore: updatedCampaigns.length === 20,
      })
    } else if (method === 'load more' && canLoadMore) {
      this.setState({
        isLoadingMore: true,
      })
      const newCampaigns = await getAllCampaigns(apikeys.get(0), filter, offset + 20)

      this.setState({
        campaigns: [...campaigns, ...newCampaigns],
        offset: offset + 20,
        canLoadMore: newCampaigns.length === 20,
        isLoadingMore: false,
      })
    } else if (method === 'refresh') {
      this.setState({
        isRefreshing: true,
      })

      const refreshedCampaigns = await getAllCampaigns(apikeys.get(0), filter)

      this.setState({
        campaigns: refreshedCampaigns,
        isRefreshing: false,
        isLoadingMore: false,
        canLoadMore: refreshedCampaigns.length === 20,
      })
    }
  }

  render() {
    const { filter, navigation } = this.props
    const {
      campaigns, isLoading, isLoadingMore, isRefreshing,
    } = this.state

    return (
      <SafeAreaView style={style.container}>
        <FilterRow filter={filter} context="campaigns" />
        <CampaignsList
          refresh={method => this.fetchMessages(method)}
          campaigns={campaigns}
          navigation={navigation}
          isLoading={isLoading}
          isRefreshing={isRefreshing}
        />
        {isLoadingMore && (
          <View style={style.loader}>
            <ActivityIndicator size="large" />
          </View>
        )}
        <Picker pick={() => this.fetchMessages('update')} context="campaigns" />
        <Picker pick={() => undefined} context="settings" />
      </SafeAreaView>
    )
  }
}

const style = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#f6f6f6',
  },
  loader: {
    paddingTop: 10,
    paddingBottom: 10,
  },
})
