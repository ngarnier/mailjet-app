import React from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import reducer from './src/reducers/index'
import Home from './src/screens/Home'
import Login from './src/screens/Login'
import { loadApiKeys } from './src/actions/apikeys'
import { StyleProvider } from 'native-base'
import getTheme from './src/native-base-theme/components'
import commonColor from './src/native-base-theme/variables/commonColor'

const store = createStore(reducer, applyMiddleware(thunk))
async function boot() {
  await store.dispatch(loadApiKeys())
}
boot()

export default class App extends React.Component {
  render() {
    const apikeys = store.getState('apikeys').apikeys.get(0)
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(commonColor)}>
          {apikeys ? (<Home />) : <Login />}
        </StyleProvider>
      </Provider>
    )
  }
}
