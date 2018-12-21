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
    strokeWidth: 1.5,
    stroke: '#A6A6A6',
  },
  opened: {
    strokeWidth: 1.5,
    stroke: '#80D034',
  },
  clicked: {
    strokeWidth: 1.5,
    stroke: '#589F1B',
  },
  hardBounced: {
    strokeWidth: 1.5,
    stroke: '#FD8A6F',
  },
  softBounced: {
    strokeWidth: 1.5,
    stroke: '#FEBC9A',
  },
  blocked: {
    strokeWidth: 1.5,
    stroke: '#000001',
  },
  spam: {
    strokeWidth: 1.5,
    stroke: '#CC0B24',
  },
  unsub: {
    strokeWidth: 1.5,
    stroke: '#23B2FB',
  },
}
