import React from 'react'
import { connect } from 'react-redux'
import { StyleProvider } from 'native-base'
import getTheme from '../../native-base-theme/components'
import commonColor from '../../native-base-theme/variables/commonColor'
import MainApp from '../MainApp'
import Login from '../Login'

@connect(state => ({
  apikeys: state.apikeys
}))

export default class Home extends React.Component {
  render() {
    const { apikeys } = this.props
    return (
      <StyleProvider style={getTheme(commonColor)}>
        {apikeys.size ? (
          <MainApp />
        ) : (
          <Login />
          )}
      </StyleProvider>
    )
  }
}
