import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native'

export default function EmptyState({ state, context, tryAgain }) {
  return (
    <View style={style.container}>
      {state === 'no-data' ? (
        <View style={style.container}>
          <Image
            style={{ height: 180, resizeMode: 'contain' }}
            /* eslint-disable global-require */
            source={require('../img/noResultState.png')}
            /* eslint-enable */
          />
          <Text>No {context}</Text>
        </View>
      ) : state === 'network-issue' && state !== 'loading' ? (
        <View style={style.container}>
          <Text>The request failed due to network issues</Text>
          <Text onPress={() => tryAgain()}>Try again</Text>
        </View>
      ) : state === 'loading' && (
        <View style={style.loading}>
          <ActivityIndicator size="large" />
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
