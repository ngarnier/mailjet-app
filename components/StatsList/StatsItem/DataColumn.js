import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class DataColumn extends React.Component {
  render() {
    return (
      <View style={styles.column}>
        <Text style={styles.category}>{this.props.category}</Text>
        <Text style={styles.data}>{this.props.data}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
    padding: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
  },
  category: {
    color: '#444',
  },
  data: {
    marginTop: 10,
    fontSize: 16,
  },
});
