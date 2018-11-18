import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text } from 'react-native'
import EmptyState from './EmptyState'
import { getApiKeyStats } from '../helpers/mailjet'
import { getWeekTS } from '../helpers/util'
import StatsChart from './StatsChart'

@connect(state => ({
  apikeys: state.apikeys,
}))

export default class StatsCard extends React.Component {
  state = {
    isLoading: true,
    requestFailed: false,
    events: {
      sent: [],
      opened: [],
      clicked: [],
      hardBounced: [],
      softBounced: [],
      blocked: [],
      spam: [],
      unsub: [],
    },
  }

  componentDidMount = async () => {
    const { apikeys } = this.props
    const {
      sent,
      opened,
      clicked,
      hardBounced,
      softBounced,
      blocked,
      spam,
      unsub,
    } = this.state.events

    const stats = await getApiKeyStats(apikeys.get(0))

    if (typeof stats !== 'object') {
      this.setState({
        isLoading: false,
        requestFailed: true,
      })
    }

    for (let i = 0; i < 7; i += 1) {
      sent.push(0)
      opened.push(0)
      clicked.push(0)
      hardBounced.push(0)
      softBounced.push(0)
      blocked.push(0)
      spam.push(0)
      unsub.push(0)
    }

    const initialTS = getWeekTS()

    for (let i = 0; i < stats.length; i += 1) {
      sent[((Date.parse(new Date(stats[i].Timeslice)) / 1000) - initialTS) / 86400] =
        stats[i].MessageSentCount
      opened[((Date.parse(new Date(stats[i].Timeslice)) / 1000) - initialTS) / 86400] =
        stats[i].MessageOpenedCount
      clicked[((Date.parse(new Date(stats[i].Timeslice)) / 1000) - initialTS) / 86400] =
        stats[i].MessageClickedCount
      hardBounced[((Date.parse(new Date(stats[i].Timeslice)) / 1000) - initialTS) / 86400] =
        stats[i].MessageHardBouncedCount
      softBounced[((Date.parse(new Date(stats[i].Timeslice)) / 1000) - initialTS) / 86400] =
        stats[i].MessageSoftBouncedCount
      blocked[((Date.parse(new Date(stats[i].Timeslice)) / 1000) - initialTS) / 86400] =
        stats[i].MessageBlockedCount
      spam[((Date.parse(new Date(stats[i].Timeslice)) / 1000) - initialTS) / 86400] =
        stats[i].MessageSpamCount
      unsub[((Date.parse(new Date(stats[i].Timeslice)) / 1000) - initialTS) / 86400] =
        stats[i].MessageUnsubscribedCount
    }

    const sentMax = Math.max(...sent)
    const openedMax = Math.max(...opened)
    const clickedMax = Math.max(...clicked)
    const hardBouncedMax = Math.max(...hardBounced)
    const softBouncedMax = Math.max(...softBounced)
    const blockedMax = Math.max(...blocked)
    const spamMax = Math.max(...spam)
    const unsubMax = Math.max(...unsub)
    const overallMax = Math.max(sentMax, openedMax, clickedMax, hardBouncedMax, softBouncedMax, blockedMax, spamMax, unsubMax) * 1.2

    this.setState({
      events: {
        sent,
        opened,
        clicked,
        hardBounced,
        softBounced,
        blocked,
        spam,
        unsub,
      },
      overallMax,
      isLoading: false,
    })
  }

  render() {
    const { events } = this.state
    const { overallMax, isLoading, requestFailed } = this.state

    return (
      <View style={style.card}>
        {isLoading ? (
          <Text>Loading to be improved</Text>
        ) : requestFailed ? (
          <EmptyState context="stats" state="network-issue" />
        ) : (
          <StatsChart events={events} overallMax={overallMax} />
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
})
