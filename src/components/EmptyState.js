import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'
import { Spinner } from 'native-base'

export default function EmptyState({ state, context }) {
  return (
    <View style={style.container}>
      {state === 'no-data' ? (
        <View style={style.block}>
          <Text>No {context} found</Text>
        </View>
      ) : (
        <View style={style.block}>
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

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
  },
  block: {
    justifyContent: 'center',
  },
})
