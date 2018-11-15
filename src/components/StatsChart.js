import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text } from 'react-native'
import { LineChart } from 'react-native-svg-charts'
/* eslint-disable import/no-extraneous-dependencies */
import { G, Line } from 'react-native-svg'
/* eslint-enable */
import EmptyState from './EmptyState'
import { getApiKeyStats } from '../helpers/mailjet'
import { getWeekTS } from '../helpers/util'

@connect(state => ({
  apikeys: state.apikeys,
}))

export default class SubjectCard extends React.Component {
  state = {
    isLoading: true,
    requestFailed: false,
    sent: [],
    opened: [],
    clicked: [],
    hardBounced: [],
    softBounced: [],
    queued: [],
    blocked: [],
    spam: [],
    unsub: [],
  }

  componentDidMount = async () => {
    const { apikeys } = this.props
    const {
      sent,
      opened,
      clicked,
      hardBounced,
      softBounced,
      queued,
      blocked,
      spam,
      unsub,
    } = this.state

    const stats = await getApiKeyStats(apikeys.get(0))

    if (typeof stats !== 'object') {
      this.setState({
        isLoading: false,
        requestFailed: true,
      })
    }

    // Fill the arrays with 30 values equal to 0
    for (let i = 0; i < 7; i += 1) {
      sent.push(0)
      opened.push(0)
      clicked.push(0)
      hardBounced.push(0)
      softBounced.push(0)
      queued.push(0)
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
      // clicked[((Date.parse(new Date(stats[i].Timeslice)) / 1000) - initialTS) / 86400] =
      //   stats[i].MessageClickedCount
      // hardBounced[((Date.parse(new Date(stats[i].Timeslice)) / 1000) - initialTS) / 86400] =
      //   stats[i].MessageHardBouncedCount
      // softBounced[((Date.parse(new Date(stats[i].Timeslice)) / 1000) - initialTS) / 86400] =
      //   stats[i].MessageSoftBouncedCount
      // queued[((Date.parse(new Date(stats[i].Timeslice)) / 1000) - initialTS) / 86400] =
      //   stats[i].MessageQueuedCount
      // blocked[((Date.parse(new Date(stats[i].Timeslice)) / 1000) - initialTS) / 86400] =
      //   stats[i].MessageBlockedCount
      // spam[((Date.parse(new Date(stats[i].Timeslice)) / 1000) - initialTS) / 86400] =
      //   stats[i].MessageSpamCount
      // unsub[((Date.parse(new Date(stats[i].Timeslice)) / 1000) - initialTS) / 86400] =
      //   stats[i].MessageUnsubscribedCount
    }

    this.setState({
      sent,
      opened,
      clicked,
      // hardBounced,
      // softBounced,
      // queued,
      // blocked,
      // spam,
      // unsub,
      isLoading: false,
    })
  }

  render() {
    const {
      sent,
      opened,
      clicked,
      hardBounced,
      softBounced,
      queued,
      blocked,
      spam,
      unsub,
      isLoading,
      requestFailed,
    } = this.state

    const CustomGrid = ({ y, ticks }) => (
      <G>
        {
          ticks.map(tick => (
            <Line
              key={tick}
              x1="0%"
              x2="100%"
              y1={y(tick)}
              y2={y(tick)}
              stroke="rgba(0,0,0,0.2)"
            />
          ))
        }
      </G>
    )

    return (
      <View style={style.card}>
        {isLoading ? (
          <Text>Loading to be improved</Text>
        ) : requestFailed ? (
          <EmptyState context="stats" state="network-issue" />
        ) : (
          <View style={{ height: 200 }}>
            <LineChart
              style={{ flex: 1 }}
              data={sent}
              svg={{
                stroke: '#C6C6C6',
              }}
            >
              <CustomGrid />
            </LineChart>
            <LineChart
              style={StyleSheet.absoluteFill}
              data={opened}
              svg={{
                stroke: '#80D034',
              }}
            />
            <LineChart
              style={StyleSheet.absoluteFill}
              data={clicked}
              svg={{
                stroke: '#589F1B',
              }}
            />
            {/* <LineChart
              style={StyleSheet.absoluteFill}
              data={hardBounced}
              svg={{
                stroke: '#FD8A6F',
              }}
            />
            <LineChart
              style={StyleSheet.absoluteFill}
              data={softBounced}
              svg={{
                stroke: '#FEBC9A',
              }}
            />
            <LineChart
              style={StyleSheet.absoluteFill}
              data={queued}
              svg={{
                stroke: 'blue',
              }}
            />
            <LineChart
              style={StyleSheet.absoluteFill}
              data={blocked}
              svg={{
                stroke: '#000001',
              }}
            />
            <LineChart
              style={StyleSheet.absoluteFill}
              data={spam}
              svg={{
                stroke: '#CC0B24',
              }}
            />
            <LineChart
              style={StyleSheet.absoluteFill}
              data={unsub}
              svg={{
                stroke: '#23B2FB',
              }}
            /> */}
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
