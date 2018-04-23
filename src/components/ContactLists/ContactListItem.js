import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'

export default class ContactListItem extends React.Component {
  render() {
    const { id, name, total, active, unsub, delivered, opened, clicked } = this.props.list

    return (
      <TouchableOpacity
        style={style.row}
        onPress={() => this.props.navigation.navigate('ContactList', {
          id,
          name,
          total,
          active,
          unsub,
          delivered,
          opened,
          clicked
        })}
      >
        <Text style={style.title}>{name}</Text>
        <Text style={{ marginBottom: 5 }}>
          {total} subscribers
        </Text>
        <View>
          <Text style={style.stats}>{opened} opened</Text>
          <Text style={style.stats}>{clicked} clicked</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const style = StyleSheet.create({
  row: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderBottomWidth: 1,
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    paddingBottom: 5,
  },
  stats: {
    color: '#333',
    fontWeight: 'bold',
  }
})
