import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, Button, StyleSheet } from 'react-native'
import disconnection from '../img/disconnection.png'
import noResult from '../img/noResultState.png'

export default function EmptyState({ state, context, tryAgain }) {
  return (
    <View style={style.container}>
      {state === 'no-data' ? (
        <View style={style.container}>
          <Image
            style={{ height: 180, resizeMode: 'contain' }}
            /* eslint-disable global-require */
            source={noResult}
            /* eslint-enable */
          />
          <Text>No {context}</Text>
        </View>
      ) : state === 'network-issue' && state !== 'loading' && (
        <View style={style.container}>
          <Image
            style={{ height: 180, resizeMode: 'contain' }}
            /* eslint-disable global-require */
            source={disconnection}
            /* eslint-enable */
          />
          <Text style={{ marginBottom: 10 }}>The request failed due to network issues</Text>
          <Button
            onPress={() => tryAgain()}
            title="Try again"
            color="#1FBE9F"
            accessibilityLabel="Try again"
          />
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
