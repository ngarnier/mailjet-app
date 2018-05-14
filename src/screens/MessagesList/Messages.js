import React from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import FilterRow from '../../components/FilterRow'
import Picker from '../../components/Picker'
import MessagesList from './MessagesList'

@connect(state => ({
  filter: state.filters.messages,
}))

export default class Messages extends React.Component {
  static propTypes = {
    filter: PropTypes.objectOf(PropTypes.string).isRequired,
  }

  render() {
    const { filter } = this.props

    return (
      <SafeAreaView style={style.container}>
        <FilterRow filter={filter} context="messages" />
        <MessagesList filter={filter} />
        <Picker context="messages" />
      </SafeAreaView>
    )
  }
}

const style = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#f6f6f6',
    flex: 1,
  },
})

