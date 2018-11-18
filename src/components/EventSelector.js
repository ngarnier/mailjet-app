import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'

export default class EventSelector extends React.Component {
  state = { isSelected: true }

  toggle = () => {
    const { isSelected } = this.state
    this.setState({
      isSelected: !isSelected,
    })
  }

  render() {
    const { isSelected } = this.state
    const { event } = this.props

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => this.toggle()}
        style={style.eventRow}
      >
        <View style={[style.eventBox, isSelected ? style[event] : style.inactive]} />
        <Text style={style.label}>{event}</Text>
      </TouchableOpacity>
    )
  }
}

const style = StyleSheet.create({
  eventRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 10,
    marginTop: 10,
  },
  eventBox: {
    width: 20,
    height: 20,
    borderColor: '#aaa',
    borderWidth: 1,
    marginRight: 5,
  },
  label: {
    fontSize: 17,
    fontFamily: 'System',
    color: '#333',
  },
  sent: {
    backgroundColor: '#C6C6C6',
  },
  opened: {
    backgroundColor: '#80D034',
  },
  clicked: {
    backgroundColor: '#589F1B',
  },
  hardBounced: {
    backgroundColor: '#FD8A6F',
  },
  softBounced: {
    backgroundColor: '#FEBC9A',
  },
  blocked: {
    backgroundColor: '#000001',
  },
  spam: {
    backgroundColor: '#CC0B24',
  },
  unsub: {
    backgroundColor: '#23B2FB',
  },
  inactive: {
    backgroundColor: '#fff',
  },
})
