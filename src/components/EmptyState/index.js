import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Spinner } from 'native-base'

export default class EmptyState extends React.Component {
  render() {
    return (
      <View contentContainerStyle={styles.container}>
        {this.props.state === 'no-data' && (
          <View style={styles.container}>
            <Text>No {this.props.context} found</Text>
          </View>
        )}
        {this.props.state === 'loading' && (
          <View style={styles.container}>
            <Spinner color="#FCAC2E" />
            <Text>Loading {this.props.context}</Text>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
    paddingTop: 200,
  },
});
