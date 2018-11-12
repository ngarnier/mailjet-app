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

export default ContactsNavigator
