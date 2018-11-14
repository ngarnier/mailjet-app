import React from 'react'
import { createStackNavigator } from 'react-navigation'
import Lists from './Lists'
import ContactList from './ContactList'
import ListContacts from './ContactList/ListContacts'
import ContactCard from './ContactList/ContactCard'
import LogOut from '../../components/LogOut'

const ContactsNavigator = createStackNavigator({
  Lists: {
    screen: Lists,
    navigationOptions: {
      title: 'Contact Lists',
    },
  },
  ContactList: {
    screen: ContactList,
    navigationOptions: {
      tabBarVisible: false,
    },
  },
  ListContacts: {
    screen: ListContacts,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}`,
      tabBarVisible: false,
    }),
  },
  Contact: {
    screen: ContactCard,
    navigationOptions: {
      tabBarVisible: false,
    },
  },
}, {
  navigationOptions: {
    headerRight: (<LogOut />),
    headerForceInset: { top: 'never' },
    headerStyle: {
      backgroundColor: '#fff',
    },
    headerTitleStyle: {
      color: '#000',
    },
    headerBackTitleStyle: {
      color: '#1FBE9F',
    },
    headerTintColor: '#1FBE9F',
  },
})

ContactsNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  if (navigation.state.index > 0) {
    tabBarVisible = false
  }

  return {
    tabBarVisible,
  }
}

export default ContactsNavigator
