import { StackNavigator } from 'react-navigation'
import MessagesLists from './MessagesList'

const MessagesNavigator = StackNavigator({
  MessagesLists: {
    screen: MessagesLists,
    navigationOptions: {
      title: 'Transactional Activity',
      headerStyle: {
        backgroundColor: '#ffbf40'
      },
      headerTintColor: '#fff'
    },
  },
})

export default MessagesNavigator
