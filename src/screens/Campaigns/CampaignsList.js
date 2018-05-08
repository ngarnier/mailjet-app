import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, SafeAreaView, TouchableOpacity, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import FilterRow from '../../components/FilterRow'
import Picker from '../../components/Picker'
import MessageRow from '../../components/MessageRow'
import EmptyState from '../../components/EmptyState'
import { getAllCampaigns } from '../../helpers/mailjet'

const style = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#f6f6f6',
  },
})

@connect(state => ({
  apikeys: state.apikeys,
  filters: state.filters,
}))

export default class CampaignsList extends React.Component {
  state = {
    campaigns: [],
    isLoading: false,
  }

  componentDidMount = async () => {
    const { apikeys, filters } = this.props

    this.setState({
      isLoading: true,
    })

    const filter = filters.campaigns
    const campaigns = await getAllCampaigns(apikeys.get(0), filter)
    this.setState({
      campaigns,
      isLoading: false,
    })
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.filters.campaigns === this.props.filters.campaigns
  }

  componentDidUpdate = async () => {
    const { apikeys, filters } = this.props
    const filter = filters.campaigns
    const campaigns = await getAllCampaigns(apikeys.get(0), filter)
    this.setState({
      campaigns,
      isLoading: false,
    })
  }

  render() {
    const { campaigns, isLoading } = this.state
    const { filters } = this.props

    return (
      <SafeAreaView style={style.container}>
        <FilterRow filter={filters.campaigns} />
        {campaigns.length > 0 ? (
          <ScrollView>
            {campaigns.map(e => (
              <TouchableOpacity
                key={e.id}
                onPress={() => this.props.navigation.navigate('Campaign', {
                  id: e.id,
                  title: e.title,
                  delivered: e.delivered,
                  opened: e.opened,
                  clicked: e.clicked,
                })}
              >
                <MessageRow
                  title={e.title}
                  subtitle={e.subject}
                  status={e.status}
                  date={e.date}
                  navigation={this.props.navigation}
                />
              </TouchableOpacity>))}
          </ScrollView>
        ) : isLoading ? (
          <View>
            <EmptyState state="loading" context="Campaigns" />
          </View>
        ) : (
          <View>
            <EmptyState state="no-data" context="Campaigns" navigation={this.props.navigation} />
          </View>
            )}
        <Picker context="campaigns" />
      </SafeAreaView>
    )
  }
}

CampaignsList.propTypes = {
  filters: PropTypes.string.isRequired,
}
