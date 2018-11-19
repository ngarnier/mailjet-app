import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'
import { LineChart } from 'react-native-svg-charts'

@connect(state => ({
  apikeys: state.apikeys,
}))

export default class SubjectCard extends React.Component {
  static propTypes = {
    event: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    overallMax: PropTypes.number.isRequired,
  }

  render() {
    const { event, data, overallMax } = this.props

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
