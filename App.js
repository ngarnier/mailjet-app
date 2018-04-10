import React from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import StatsList from './components/StatsList/StatsList'
import APIKeysList from './components/APIKeysList/APIKeysList'
import AddAPIKey from './components/AddAPIKey'

const RootStack = StackNavigator(
  {
    Statistics: {
      screen: StatsList,
    },
  },
  {
    initialRouteName: 'Statistics',
  }
)

const APIKeysStack = StackNavigator({
  'API keys': {
    screen: APIKeysList,
  },
  'Add API key': {
    screen: AddAPIKey,
  },
})

const MainNavigator = DrawerNavigator({
  Statistics: {
    screen: RootStack,
  },
  'API keys': {
    screen: APIKeysStack,
  },
})

export default class App extends React.Component {
  render() {
    return <MainNavigator />
  }
}
