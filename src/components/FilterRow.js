import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Icon } from 'native-base'
import { showModal } from '../actions/modals'

@connect(null, {
  showModalConnected: showModal,
})

export default class FilterRow extends React.Component {
  static propTypes = {
    showModalConnected: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    context: PropTypes.string.isRequired,
  }

  render() {
    const { showModalConnected, filter, context } = this.props
    return (
      <View style={style.row}>
        <TouchableOpacity
          style={style.block}
          onPress={() => showModalConnected(context)}
        >
          <Icon
            name="sliders"
            type="FontAwesome"
            style={style.icon}
          />
          <Text style={style.filter}>
            {filter}
          </Text>
        </TouchableOpacity>
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
  block: {
    flexDirection: 'row',
  },
  icon: {
    color: '#fda836',
    marginRight: 10,
    fontSize: 22,
  },
  filter: {
    fontSize: 18,
    color: '#fda836',
  },
})
