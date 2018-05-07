import React from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'native-base'
import { showModal } from '../actions/modals'

@connect(state => ({
  modals: state.modals,
}), {
  showModal,
})

export default class FilterRow extends React.Component {
  state = {
    type: 'Sent',
  }

  render() {
    const { type } = this.state
    const { modals, showModal } = this.props
    return (
      <View style={style.row}>
        <Icon
          name="sort"
          type="MaterialIcons"
          style={style.icon}
          onPress={showModal}
        />
        <Text
          style={style.type}
          onPress={showModal}
        >
          {type}
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
  type: {
    fontSize: 16,
    color: '#fda836',
  },
})
