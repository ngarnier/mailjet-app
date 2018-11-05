import React from 'react'
import { StackNavigator } from 'react-navigation'
import Lists from './Lists'
import ContactList from '../ContactList'
import ListContacts from '../ContactList/ListContacts'
import ContactCard from '../ContactList/ContactCard'
import ContactDetails from '../ContactList/ContactDetails'
import SettingsGear from '../../components/SettingsGear'

const ContactsNavigator = StackNavigator({
  Lists: {
    screen: Lists,
    navigationOptions: {
      title: 'Contact Lists',
      headerRight: <SettingsGear />,
      headerStyle: {
        backgroundColor: '#fead0d',
      },
      headerTintColor: '#fff',
    },
  },
  ContactList: {
    screen: ContactList,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#fead0d',
      },
      headerTintColor: '#fff',
    },
  },
  ListContacts: {
    screen: ListContacts,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}`,
      headerStyle: {
        backgroundColor: '#fead0d',
      },
      headerTintColor: '#fff',
    }),
  },
  Contact: {
    screen: ContactCard,
    navigationOptions: () => ({
      title: 'Contact information',
      headerStyle: {
        backgroundColor: '#fead0d',
      },
      headerTintColor: '#fff',
    }),
  },
  ContactDetails: {
    screen: ContactDetails,
    navigationOptions: () => ({
      title: 'Contact details',
      headerStyle: {
        backgroundColor: '#fead0d',
      },
      headerTintColor: '#fff',
    }),
  },
})

export default ContactsNavigator
