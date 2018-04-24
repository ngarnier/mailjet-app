import React from 'react'
import { StyleProvider } from 'native-base'
import getTheme from '../../native-base-theme/components'
import commonColor from '../../native-base-theme/variables/commonColor'
import MainApp from '../MainApp'

export default class Home extends React.Component {
  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <MainApp />
      </StyleProvider>
    )
  }
}
