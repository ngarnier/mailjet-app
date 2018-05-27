import React from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView, StyleSheet } from 'react-native'
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
    campaigns: undefined,
    isLoading: false,
    isRefreshing: false,
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

  fetchMessages = async (method) => {
    const { apikeys, filter } = this.props

    if (method === 'update') {
      this.setState({
        isLoading: true,
      })
    } else {
      this.setState({
        isRefreshing: true,
      })
    }

    const campaigns = await getAllCampaigns(apikeys.get(0), filter)

    this.setState({
      campaigns,
      isLoading: false,
      isRefreshing: false,
    })
  }

  render() {
    const { filter, navigation } = this.props
    const { isLoading, isRefreshing, campaigns } = this.state

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
        <Picker pick={() => this.fetchMessages('update')} context="campaigns" />
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
