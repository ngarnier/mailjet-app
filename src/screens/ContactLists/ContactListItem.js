import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

export default function ContactListItem({
  id,
  name,
  subscribers,
  navigation,
}) {
  return (
    <TouchableOpacity
      style={style.row}
      onPress={() => navigation.navigate('ContactList', {
        id,
        name,
        subscribers,
      })}
    >
      <Text style={style.title}>{name}</Text>
      <Text style={{ marginBottom: 5 }}>
        {subscribers} subscribers
      </Text>
    </TouchableOpacity>
  )
}

ContactListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  subscribers: PropTypes.number.isRequired,
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
})
