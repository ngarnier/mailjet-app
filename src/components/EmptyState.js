import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Spinner } from 'native-base'

export default class EmptyState extends React.Component {
  render() {
    const { state, context } = this.props

    return (
      <View contentContainerStyle={styles.container}>
        {state === 'no-data' ? (
          <View style={styles.container}>
            <Text>No {context} found</Text>
          </View>
        ) : (
          <View style={styles.container}>
            <Spinner color="#FCAC2E" />
            <Text>Loading {context}</Text>
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
