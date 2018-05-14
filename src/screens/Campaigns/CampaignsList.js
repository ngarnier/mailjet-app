import React from 'react'
import PropTypes from 'prop-types'
import { FlatList, TouchableOpacity, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import MessageRow from '../../components/MessageRow'
import EmptyState from '../../components/EmptyState'
import { getAllCampaigns } from '../../helpers/mailjet'

@connect(state => ({
  apikeys: state.apikeys,
  filter: state.filters.campaigns,
}))

export default class CampaignsList extends React.Component {
  static propTypes = {
    filter: PropTypes.objectOf(PropTypes.string).isRequired,
  }

  state = {
    campaigns: [],
    isLoading: false,
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
            <EmptyState state="no-data" context="Campaigns" />
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
