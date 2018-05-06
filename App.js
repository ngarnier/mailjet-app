import React from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { StyleProvider } from 'native-base'
import Home from './src/screens/Home'
import Login from './src/screens/Login'
import reducer from './src/reducers/index'
import { loadApiKeys } from './src/actions/apikeys'
import getTheme from './src/native-base-theme/components'
import commonColor from './src/native-base-theme/variables/commonColor'

const store = createStore(reducer, applyMiddleware(thunk))
async function boot() {
  await store.dispatch(loadApiKeys())
}
boot()

export default function App() {
  const apikeys = store.getState('apikeys').apikeys.get(0)
  return (
    <Provider store={store}>
      <StyleProvider style={getTheme(commonColor)}>
        {apikeys ? (<Home />) : <Login />}
      </StyleProvider>
    </Provider>
  )
}
