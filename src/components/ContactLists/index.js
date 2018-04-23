import React from 'react'
import { StackNavigator } from 'react-navigation'
import ContactLists from './ContactLists'
import ContactList from '../ContactList'
import ListContacts from '../ContactList/ListContacts'

const ListsNavigator = StackNavigator({
  ContactLists: {
    screen: ContactLists,
    navigationOptions: {
      header: 'none',
    },
  },
  ContactList: {
    screen: ContactList,
  },
  ListContacts: {
    screen: ListContacts,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}`,
    }),
  },
},
{
  initialRouteName: 'ContactLists'
}
)

export default class ContactsScreen extends React.Component {
  render() {
    return (
      <ListsNavigator />
    )
  }
}
