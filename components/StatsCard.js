import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import EmptyState from './EmptyState'
import { getApiKeyStats } from '../helpers/mailjet'
import { getWeekTS, getMonthTS, getDayTS } from '../helpers/util'
import StatsChart from './StatsChart'
import Pick from './Pick'

@connect(state => ({
  apikeys: state.apikeys,
  period: state.filters.period,
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
    this.getStats()
  }

  getStats = async () => {
    this.setState({
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
    })
    const { apikeys, period } = this.props
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
    const periodLength = period === 'Month' ? 31
      : period === 'Week' ? 8 : 25

    const stats = await getApiKeyStats(apikeys.get(0), period)

    for (let i = 0; i < periodLength; i += 1) {
      sent.push(0)
      opened.push(0)
      clicked.push(0)
      hardBounced.push(0)
      softBounced.push(0)
      blocked.push(0)
      spam.push(0)
      unsub.push(0)
    }

    if (typeof stats !== 'object') {
      this.setState({
        isLoading: false,
        requestFailed: true,
      })
      return
    } else if (stats.length === 0) {
      this.setState({
        isLoading: false,
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
      })
      return
    }

    const initialTS = period === 'Week' ? getWeekTS() :
      period === 'Month' ? getMonthTS() : getDayTS()

    const divider = period === 'Day' ? 3600 : 86400

    for (let i = 0; i < stats.length; i += 1) {
      sent[((Date.parse(new Date(stats[i].Timeslice)) / 1000) - initialTS) / divider] =
        stats[i].MessageSentCount
      opened[((Date.parse(new Date(stats[i].Timeslice)) / 1000) - initialTS) / divider] =
        stats[i].MessageOpenedCount
      clicked[((Date.parse(new Date(stats[i].Timeslice)) / 1000) - initialTS) / divider] =
        stats[i].MessageClickedCount
      hardBounced[((Date.parse(new Date(stats[i].Timeslice)) / 1000) - initialTS) / divider] =
        stats[i].MessageHardBouncedCount
      softBounced[((Date.parse(new Date(stats[i].Timeslice)) / 1000) - initialTS) / divider] =
        stats[i].MessageSoftBouncedCount
      blocked[((Date.parse(new Date(stats[i].Timeslice)) / 1000) - initialTS) / divider] =
        stats[i].MessageBlockedCount
      spam[((Date.parse(new Date(stats[i].Timeslice)) / 1000) - initialTS) / divider] =
        stats[i].MessageSpamCount
      unsub[((Date.parse(new Date(stats[i].Timeslice)) / 1000) - initialTS) / divider] =
        stats[i].MessageUnsubscribedCount
    }

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
      isLoading: false,
    })
  }

  render() {
    const {
      isLoading, requestFailed, events,
    } = this.state

    return (
      <View style={style.card}>
        <View style={style.header}>
          <Text style={style.title}>
            Statistics
          </Text>
          <View style={{ width: 80, alignItems: 'flex-start' }}>
            <Pick pick={() => this.getStats()} context="period" />
          </View>
        </View>
        {isLoading ? (
          <View>
            <View style={{ height: 200, justifyContent: 'center' }}>
              <ActivityIndicator style={{ paddingTop: 10 }} size="large" />
            </View>
          </View>
        ) : requestFailed ? (
          <EmptyState tryAgain={() => this.getStats()} context="stats" state="network-issue" />
        ) : (
          <StatsChart events={events} />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
})
