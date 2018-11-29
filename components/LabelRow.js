import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'

export default function LabelRow({ title, subtitle }) {
  return (
    <View style={style.row}>
      <Text style={style.title}>{title}</Text>
      {subtitle !== undefined && (<Text style={style.subtitle}>{subtitle}</Text>)}
    </View>
  )
}

LabelRow.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
}

LabelRow.defaultProps = {
  subtitle: null,
}

const style = StyleSheet.create({
  row: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
  title: {
    fontSize: 17,
    fontFamily: 'System',
    fontWeight: 'bold',
    color: '#999',
    paddingBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'System',
    paddingBottom: 10,
  },
})
