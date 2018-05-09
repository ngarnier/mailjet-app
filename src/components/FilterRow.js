import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'native-base'
import { showModal } from '../actions/modals'

@connect(null, {
  showModalConnected: showModal,
})

export default class FilterRow extends React.Component {
  static propTypes = {
    showModalConnected: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
  }

  render() {
    const { showModalConnected, filter } = this.props
    return (
      <View style={style.row}>
        <Icon
          name="sort"
          type="MaterialIcons"
          style={style.icon}
          onPress={showModalConnected}
        />
        <Text
          style={style.filter}
          onPress={showModalConnected}
        >
          {filter}
        </Text>
      </View>
    )
  }
}

const style = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: 10,
  },
  icon: {
    color: '#fda836',
    marginRight: 10,
  },
  filter: {
    fontSize: 16,
    color: '#fda836',
  },
})
