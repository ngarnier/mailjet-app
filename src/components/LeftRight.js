import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'

export default function LeftRight({
  left, right, border, padding,
}) {
  return (
    <View style={[
      style.row,
      border ? style.withBorder : '',
      padding ? style.withPadding : '',
    ]}
    >
      <View style={[style.columns, { paddingBottom: 5 }]}>
        <Text style={style.label}>{left}</Text>
        <Text style={style.figure}>{right}</Text>
      </View>
    </View>
  )
}

LeftRight.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  left: PropTypes.any.isRequired,
  right: PropTypes.any.isRequired,
  /* eslint-enable */
  border: PropTypes.bool,
  padding: PropTypes.bool,
}

LeftRight.defaultProps = {
  border: false,
  padding: false,
}

const style = StyleSheet.create({
  row: {
    backgroundColor: '#fff',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  withBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  withPadding: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  columns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 18,
    color: '#444',
  },
  figure: {
    fontSize: 18,
    color: '#222',
    fontWeight: 'bold',
  },
})

