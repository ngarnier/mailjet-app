import { StackNavigator } from 'react-navigation'
import ContactLists from './ContactLists'
import ContactList from '../ContactList'
import ListContacts from '../ContactList/ListContacts'

const ContactsNavigator = StackNavigator({
  ContactLists: {
    screen: ContactLists,
    navigationOptions: {
      title: 'Contact Lists',
      headerStyle: {
        backgroundColor: '#ffbf40',
      },
      headerTintColor: '#fff',
    },
  },
  ContactList: {
    screen: ContactList,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#ffbf40',
      },
      headerTintColor: '#fff',
    },
  },
  ListContacts: {
    screen: ListContacts,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.Name}`,
      headerStyle: {
        backgroundColor: '#ffbf40',
      },
      headerTintColor: '#fff',
    }),
  },
})

export default ContactsNavigator
