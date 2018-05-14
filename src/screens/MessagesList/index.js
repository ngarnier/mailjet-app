import { StackNavigator } from 'react-navigation'
import Messages from './Messages'

const MessagesNavigator = StackNavigator({
  MessagesLists: {
    screen: Messages,
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
