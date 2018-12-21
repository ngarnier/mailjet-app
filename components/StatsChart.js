import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import { LineChart, YAxis } from 'react-native-svg-charts'
/* eslint-disable import/no-extraneous-dependencies */
import { G, Line } from 'react-native-svg'
/* eslint-enable */
import { formatNumber } from '../helpers/util'
import EventSelector from './EventSelector'
import EventChart from './EventChart'

@connect(state => ({
  selectors: state.selectors,
}))

export default class StatsChart extends React.Component {
  static propTypes = {
    events: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    selectors: PropTypes.objectOf(PropTypes.bool).isRequired,
  }

  render() {
    const { events, selectors } = this.props
    const maxValues = []
    for (let i = 0; i < Object.keys(selectors).length; i += 1) {
      if (Object.values(selectors)[i]) {
        maxValues.push(Math.max(...events[Object.keys(selectors)[i]]))
      }
    }
    /* eslint-disable max-len */
    let overallMax = Math.max(...maxValues) * 1.2
    /* eslint-enable max-len */

    if (!overallMax || Math.abs(overallMax) === Infinity) {
      overallMax = 100
    }

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
              stroke="rgba(0,0,0,0.1)"
            />
          ))
        }
      </G>
    )

    return (
      <View>
        <View style={{ height: 200, flexDirection: 'row' }}>
          <View style={{ height: '100%', width: 50, paddingRight: 10 }}>
            <YAxis
              data={[0, overallMax]}
              svg={{
                fill: 'grey',
                fontSize: 14,
              }}
              contentInset={{ top: 10, bottom: 10 }}
              style={{ height: '100%', paddingLeft: 0 }}
              formatLabel={value => formatNumber(value)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <LineChart
              style={{ flex: 1 }}
              data={events.sent}
              yMin={0}
              yMax={overallMax}
              contentInset={{ top: 10, bottom: 10 }}
            >
              <CustomGrid />
            </LineChart>
            {/* eslint-disable */}
            {Object.keys(events).map((event, index) => {
              if (selectors[event]) {
                return (
                  <EventChart
                    key={index.toString()}
                    event={event}
                    data={events[event]}
                    overallMax={overallMax}
                  />
                )
              }
            })}
            {/* eslint-enable */}
          </View>
        </View>
        <View style={style.selectors}>
          {Object.keys(events).map((event, index) => (
            <EventSelector key={index.toString()} event={event} />
          ))}
        </View>
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
  subject: {
    color: '#777',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  selectors: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
