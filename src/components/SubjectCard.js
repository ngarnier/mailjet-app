import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
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

  refresh = async () => {
    const { apikeys } = this.props

    this.setState({
      isLoading: true,
    })

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
    const { navigation } = this.props

    return (
      <View style={style.card}>
        {!isLoading && typeof lastCampaign !== 'object' ? (
          <EmptyState tryAgain={() => this.refresh()} context="campaign" state="network-issue" />
        ) : (
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Campaign', {
                id: lastCampaign.id,
                title: lastCampaign.title,
                delivered: lastCampaign.delivered,
                opened: lastCampaign.opened,
                clicked: lastCampaign.clicked,
                status: lastCampaign.status,
              })}
            >
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
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  }
}

const style = StyleSheet.create({
  card: {
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 5,
    paddingTop: 10,
    paddingRight: 15,
    paddingBottom: 10,
    paddingLeft: 15,
    marginLeft: 5,
    marginRight: 5,
  },
  columns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  subject: {
    color: '#777',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
})
