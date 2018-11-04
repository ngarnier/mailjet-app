import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'

export default function LeftRight({ left, right, border }) {
  return (
    <View style={border ? style.rowWithBorder : style.rowWithoutBorder}>
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
}

LeftRight.defaultProps = {
  border: false,
}

const style = StyleSheet.create({
  rowWithoutBorder: {
    backgroundColor: '#fff',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  rowWithBorder: {
    backgroundColor: '#fff',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  columns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    color: '#444',
  },
  figure: {
    fontSize: 16,
    color: '#222',
    fontWeight: 'bold',
  },
})

