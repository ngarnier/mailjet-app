import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'
import { Spinner } from 'native-base'

export default function EmptyState({ state, context }) {
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

EmptyState.propTypes = {
  state: PropTypes.string.isRequired,
  context: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
    paddingTop: 200,
  },
})
