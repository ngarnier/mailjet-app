import React from 'react'
import { StackNavigator } from 'react-navigation'
import ContactLists from './ContactLists'
import ContactList from '../ContactList'
import ListContacts from '../ContactList/ListContacts'
import SettingsGear from '../../components/SettingsGear'

const ContactsNavigator = StackNavigator({
  ContactLists: {
    screen: ContactLists,
    navigationOptions: {
      title: 'Contact Lists',
      headerRight: <SettingsGear />,
      headerStyle: {
        backgroundColor: '#ffc94c',
      },
      headerTintColor: '#fff',
    },
  },
  ContactList: {
    screen: ContactList,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#ffc94c',
      },
      headerTintColor: '#fff',
    },
  },
  ListContacts: {
    screen: ListContacts,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}`,
      headerStyle: {
        backgroundColor: '#ffc94c',
      },
      headerTintColor: '#fff',
    }),
  },
})

export default ContactsNavigator
