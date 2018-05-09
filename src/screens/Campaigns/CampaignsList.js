import React from 'react'
import PropTypes from 'prop-types'
import { FlatList, TouchableOpacity, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import MessageRow from '../../components/MessageRow'
import EmptyState from '../../components/EmptyState'
import { getAllCampaigns } from '../../helpers/mailjet'

@connect(state => ({
  apikeys: state.apikeys,
  filters: state.filters,
}))

export default class CampaignsList extends React.Component {
  static propTypes = {
    filters: PropTypes.objectOf(PropTypes.string).isRequired,
  }

  state = {
    campaigns: [],
    isLoading: false,
  }

  componentDidMount = async () => {
    const { apikeys, filters } = this.props

    this.setState({
      isLoading: true,
    })

    const campaigns = await getAllCampaigns(apikeys.get(0), filters.campaigns)
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
    const campaigns = await getAllCampaigns(apikeys.get(0), filters.campaigns)
    this.setState({
      campaigns,
      isLoading: false,
    })
  }

  render() {
    const { campaigns, isLoading } = this.state
    const { navigation } = this.props

    return (
      <View style={style.container}>
        {campaigns.length > 0 ? (
          <FlatList
            data={campaigns}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Campaign', {
                  id: item.id,
                  title: item.title,
                  delivered: item.delivered,
                  opened: item.opened,
                  clicked: item.clicked,
                  status: item.status,
                })}
              >
                <MessageRow
                  title={item.title}
                  subtitle={item.subject}
                  status={item.status}
                  date={item.date}
                  navigation={navigation}
                />
              </TouchableOpacity>
            )}
          />
        ) : isLoading ? (
          <View>
            <EmptyState state="loading" context="Campaigns" />
          </View>
        ) : (
          <View>
            <EmptyState state="no-data" context="Campaigns" navigation={this.props.navigation} />
          </View>
            )}
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#f6f6f6',
  },
})
