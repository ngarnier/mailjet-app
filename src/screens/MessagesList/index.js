import { StackNavigator } from 'react-navigation'
import MessagesLists from './MessagesList'

const MessagesNavigator = StackNavigator({
  MessagesLists: {
    screen: MessagesLists,
    navigationOptions: {
      title: 'Transactional Activity',
      headerStyle: {
        backgroundColor: '#ffc94c',
      },
      headerTintColor: '#fff',
    },
  },
})

export default MessagesNavigator
