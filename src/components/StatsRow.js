import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default class StatsRow extends React.Component {
  render() {
    const { delivered, opened, clicked } = this.props

    return (
      <View style={style.row}>
        <Text style={style.label}>Emails sent</Text>
        <Text style={style.title}>{delivered}</Text>
        <View style={style.columns}>
          <View style={{ width: '48%' }}>
            <Text style={style.subtitle}>{opened}</Text>
            <View style={style.emptyBar}>
              <View style={[style.filledBar, { width: `${opened}` }]} />
            </View>
            <Text>Opens</Text>
          </View>
          <View style={{ width: '48%' }}>
            <Text style={style.subtitle}>{clicked}</Text>
            <View style={style.emptyBar}>
              <View style={[style.filledBar, { width: `${clicked}` }]} />
            </View>
            <Text>Clicks</Text>
          </View>
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  row: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    padding: 20,
  },
  columns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222'
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    paddingTop: 10,
  },
  label: {
    fontSize: 16,
    color: '#444',
  },
  figure: {
    color: '#222',
    fontWeight: 'bold',
  },
  emptyBar: {
    backgroundColor: '#eee',
    height: 4,
    width: '100%',
    marginBottom: 5,
    marginTop: 5,
  },
  filledBar: {
    backgroundColor: '#55FDA3',
    height: '100%',
  }
})
