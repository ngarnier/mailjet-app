import React from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { StyleProvider } from 'native-base'
import { SafeAreaView } from 'react-native'
import Home from './screens/Home'
import reducer from './reducers/index'
import { loadApiKeys } from './actions/apikeys'
import getTheme from './native-base-theme/components'
import commonColor from './native-base-theme/variables/commonColor'

const store = createStore(reducer, applyMiddleware(thunk))
async function boot() {
  await store.dispatch(loadApiKeys())
}
boot()

export default function App() {
  return (
    <Provider store={store}>
      <StyleProvider style={getTheme(commonColor)}>
        <SafeAreaView style={{ flex: 1 }}>
          <Home />
        </SafeAreaView>
      </StyleProvider>
    </Provider>
  )
}
