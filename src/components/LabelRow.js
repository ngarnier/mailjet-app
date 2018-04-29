import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default class LabelRow extends React.Component {
  render() {
    const { title, subtitle } = this.props

    return (
      <View style={style.row}>
        <Text style={style.title}>{title}</Text>
        <Text style={style.subtitle}>{subtitle}</Text>
      </View>
    )
  }
}

const style = StyleSheet.create({
  row: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#999',
    paddingBottom: 5,
  },
  subtitle: {
    fontSize: 15,
  }
})
