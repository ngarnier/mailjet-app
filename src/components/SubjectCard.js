import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text } from 'react-native'
import StatsBar from './StatsBar'
import EmptyState from './EmptyState'
import { getLastCampaign } from '../helpers/mailjet'

@connect(state => ({
  apikeys: state.apikeys,
}))

export default class SubjectCard extends React.Component {
  state = {
    isLoading: true,
  }

  componentDidMount = async () => {
    const { apikeys } = this.props

    const lastCampaign = await getLastCampaign(apikeys.get(0))

    this.setState({
      lastCampaign,
      isLoading: false,
    })
  }

  render() {
    const {
      lastCampaign, isLoading,
    } = this.state

    return (
      <View style={style.card}>
        {!isLoading && typeof lastCampaign !== 'object' ? (
          <EmptyState context="campaign" state="network-issue" />
          ) : (
            <View>
              <View>
                <Text style={style.title}>Last campaign</Text>
                <Text style={style.subject}>
                  {isLoading ? 'Loading...' : lastCampaign.subject}
                </Text>
              </View>
              <View style={style.columns}>
                <View style={{ flex: 1, marginRight: 5 }}>
                  <StatsBar
                    label="Opens"
                    figure={isLoading ? '0%' : lastCampaign.opened}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 5 }}>
                  <StatsBar
                    label="Clicks"
                    figure={isLoading ? '0%' : lastCampaign.clicked}
                  />
                </View>
              </View>
            </View>)}
      </View>
    )
  }
}

const style = StyleSheet.create({
  card: {
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  columns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subject: {
    color: '#777',
    fontSize: 18,
    fontWeight: '600',
  },
})
