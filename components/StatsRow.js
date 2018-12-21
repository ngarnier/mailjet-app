import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text } from 'react-native'
import StatsBar from './StatsBar'
import { getObjectStats } from '../helpers/mailjet'

@connect(state => ({
  apikeys: state.apikeys,
}))

export default class StatsRow extends React.Component {
  state = {
    isLoading: true,
    stats: {},
  }
  componentDidMount = async () => {
    const {
      apikeys, extraData, id, source,
    } = this.props
    const stats = source === 'Contact' ? extraData
      : await getObjectStats(apikeys.get(0), source, id)
    this.setState({
      isLoading: false,
      stats,
    })
  }

  render() {
    const { isLoading, stats } = this.state
    return (
      <View style={style.row}>
        {isLoading ? <Text>Loading</Text> : (
          <View>
            <Text style={style.label}>Emails sent</Text>
            <Text style={style.title}>{stats.sent}</Text>
            {stats.opened && stats.clicked && (
              <View style={style.columns}>
                <View style={{ width: '48%' }}>
                  <StatsBar label="Opens" figure={stats.opened} />
                </View>
                <View style={{ width: '48%' }}>
                  <StatsBar label="Clicks" figure={stats.clicked} />
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    )
  }
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
  label: {
    fontSize: 18,
    color: '#444',
  },
})
