import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'
import StatsBar from './StatsBar'

export default function StatsRow({ sent, opened, clicked }) {
  return (
    <View style={style.row}>
      <Text style={style.label}>Emails sent</Text>
      <Text style={style.title}>{sent}</Text>
      {opened && clicked && (
        <View style={style.columns}>
          <View style={{ width: '48%' }}>
            <StatsBar label="Opens" figure={opened} />
          </View>
          <View style={{ width: '48%' }}>
            <StatsBar label="Clicks" figure={clicked} />
          </View>
        </View>
      )}
    </View>
  )
}

StatsRow.propTypes = {
  sent: PropTypes.number.isRequired,
  opened: PropTypes.string,
  clicked: PropTypes.string,
}

StatsRow.defaultProps = {
  opened: null,
  clicked: null,
}

const style = StyleSheet.create({
  row: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  columns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 17,
    fontFamily: 'System',
    fontWeight: 'bold',
    color: '#222',
  },
  subtitle: {
    fontSize: 17,
    fontFamily: 'System',
    fontWeight: 'bold',
    color: '#222',
    paddingTop: 10,
  },
  label: {
    fontSize: 18,
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
    backgroundColor: '#1FBE9F',
    height: '100%',
  },
})
