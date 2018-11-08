import { StackNavigator } from 'react-navigation'
import Lists from './Lists'
import ContactList from './ContactList'
import ListContacts from './ContactList/ListContacts'
import ContactCard from './ContactList/ContactCard'

const ContactsNavigator = StackNavigator({
  Lists: {
    screen: Lists,
    navigationOptions: {
      title: 'Contact Lists',
    },
  },
  ContactList: {
    screen: ContactList,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}`,
    }),
  },
  ListContacts: {
    screen: ListContacts,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}`,
    }),
  },
  Contact: {
    screen: ContactCard,
    navigationOptions: {
      title: 'Contact information',
    },
  },
})

export default ContactsNavigator
