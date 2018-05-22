import React from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import FilterRow from '../../components/FilterRow'
import EmptyState from '../../components/EmptyState'
import Picker from '../../components/Picker'
import CampaignsList from './CampaignsList'
import { getAllCampaigns } from '../../helpers/mailjet'

@connect(state => ({
  apikeys: state.apikeys,
  filters: state.filters,
}))

export default class Campaigns extends React.Component {
  static propTypes = {
    filters: PropTypes.objectOf(PropTypes.string).isRequired,
  }

  state = {
    campaigns: [],
    isLoading: false,
    iterator: 0,
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
    })
  }

  componentDidUpdate = async () => {
    const { apikeys, filter } = this.props

    const campaigns = await getAllCampaigns(apikeys.get(0), filter)

    this.setState({
      campaigns,
      isLoading: false,
      iterator: this.state.iterator + 1,
    })
  }

  render() {
    const { filters, navigation } = this.props
    const { isLoading, campaigns } = this.state

    return (
      <SafeAreaView style={style.container}>
        <FilterRow filter={filters.campaigns} context="campaigns" />
        {typeof campaigns !== 'string' && campaigns.length > 0 ? (
          <CampaignsList campaigns={campaigns} filter={filters.campaigns} navigation={navigation} />
        ) : isLoading ? (
          <EmptyState state="loading" context="Campaigns" />
        ) : typeof campaigns === 'string' ? (
          <EmptyState state="network-issue" context="Campaigns" />
        ) : (
          <EmptyState state="no-data" context="Campaigns" />
        )}
        <Picker context="campaigns" />
      </SafeAreaView>
    )
  }
}

const style = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#f6f6f6',
  },
})
