import React from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers/index'
import StatsList from './components/StatsList'
import APIKeysList from './components/APIKeysList'
import AddAPIKey from './components/AddAPIKey'
import { loadApiKeys } from './actions/apikeys'

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

const store = createStore(reducer, applyMiddleware(thunk))
async function boot() {
  await store.dispatch(loadApiKeys())
}
boot()

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>

    )
  }
}
