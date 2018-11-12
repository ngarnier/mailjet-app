import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'

export default function StatsBar({ label, figure }) {
  return (
    <View>
      <Text style={style.subtitle}>{figure}</Text>
      <View style={style.emptyBar}>
        <View style={[style.filledBar, { width: `${figure}` }]} />
      </View>
      <Text>{label}</Text>
    </View>
  )
}

StatsBar.propTypes = {
  label: PropTypes.string.isRequired,
  figure: PropTypes.string.isRequired,
}

const style = StyleSheet.create({
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    paddingTop: 10,
  },
  emptyBar: {
    backgroundColor: '#eee',
    height: 4,
    width: '100%',
    marginBottom: 5,
    marginTop: 5,
  },
  filledBar: {
    backgroundColor: '#1FBE9F',
    height: '100%',
  },
})
