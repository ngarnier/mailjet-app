import React from 'react'
import { StackNavigator } from 'react-navigation'
import ContactLists from './ContactLists'
import ContactList from '../ContactList'
import ListContacts from '../ContactList/ListContacts'

const StatsRouter = StackNavigator({
  ContactLists: {
    screen: ContactLists,
    navigationOptions: {
      header: 'none',
      title: 'Contact Lists'
    },
  },
  ContactList: {
    screen: ContactList,
    navigationOptions: {
      title: 'List',
    },
  },
  ListContacts: {
    screen: ListContacts,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}`,
    })
  }
})

export default class StatsScreen extends React.Component {
  render() {
    return (
      <StatsRouter />
    )
  }
}