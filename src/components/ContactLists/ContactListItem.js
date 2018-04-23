import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

export default class ContactListItem extends React.Component {
  render() {
    const { ID, Name, SubscriberCount } = this.props.list

    return (
      <TouchableOpacity
        style={style.row}
        onPress={() => this.props.navigation.navigate('ContactList', {
          ID,
          Name,
          SubscriberCount,
        })}
      >
        <Text style={style.title}>{Name}</Text>
        <Text style={{ marginBottom: 5 }}>
          {SubscriberCount} subscribers
        </Text>
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
