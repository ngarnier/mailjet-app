import React from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import reducer from './src/reducers/index'
import Home from './src/components/Home'
import { loadApiKeys } from './src/actions/apikeys'

const store = createStore(reducer, applyMiddleware(thunk))
async function boot() {
  await store.dispatch(loadApiKeys())
}
boot()

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    )
  }
}
