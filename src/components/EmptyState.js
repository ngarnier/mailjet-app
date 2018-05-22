import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'
import { Spinner } from 'native-base'

export default function EmptyState({ state, context, tryAgain }) {
  return (
    <View style={style.container}>
      {state === 'no-data' ? (
        <View style={style.container}>
          <Text>No {context} found</Text>
        </View>
      ) : state === 'network-issue' ? (
        <View style={style.container}>
          <Text>The request failed due to network issues</Text>
          <Text onPress={() => tryAgain()}>Try again</Text>
        </View>
      ) : (
        <View style={style.container}>
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
  tryAgain: PropTypes.func,
}

EmptyState.defaultProps = {
  tryAgain: () => null,
}

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
})
