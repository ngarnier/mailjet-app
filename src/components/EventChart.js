import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import { LineChart } from 'react-native-svg-charts'
/* eslint-disable import/no-extraneous-dependencies */
import { G, Line } from 'react-native-svg'
/* eslint-enable */

@connect(state => ({
  apikeys: state.apikeys,
}))

export default class SubjectCard extends React.Component {
  render() {
    const { event, data, overallMax } = this.props

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
      <LineChart
        style={StyleSheet.absoluteFill}
        data={data}
        svg={strokes[event]}
        yMin={0}
        yMax={overallMax}
        contentInset={{ top: 10, bottom: 10 }}
      />
    )
  }
}

const strokes = {
  sent: {
    stroke: '#C6C6C6',
  },
  opened: {
    stroke: '#80D034',
  },
  clicked: {
    stroke: '#589F1B',
  },
  hardBounced: {
    stroke: '#FD8A6F',
  },
  softBounced: {
    stroke: '#FEBC9A',
  },
  blocked: {
    stroke: '#000001',
  },
  spam: {
    stroke: '#CC0B24',
  },
  unsub: {
    stroke: '#23B2FB',
  },
}
