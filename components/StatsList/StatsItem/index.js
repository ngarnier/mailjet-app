import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DataColumn from './DataColumn'

export default class StatsItem extends React.Component {
  render() {
    const { campaign } = this.props

    return (
      <View>
        <View style={styles.row}>
          <Text style={styles.title}>{campaign.subject}</Text>
          <View style={styles.dataRow}>
            <DataColumn category="Delivered" data={campaign.sent} />
            <DataColumn category="Opens" data={campaign.opens} />
            <DataColumn category="Clicks" data={campaign.clicks} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#fff',
    marginTop: 5,
    padding: 10,
  },
  dataRow: {
    marginTop: 5,
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
