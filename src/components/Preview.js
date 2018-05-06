import React from 'react'
import { View, WebView, StyleSheet } from 'react-native'
import { Icon } from 'native-base'
import LabelRow from './LabelRow'

export default class Preview extends React.Component {
  state = {
    isFullSize: false,
    canGoBack: false,
  }

  render() {
    const { permalink } = this.props
    const { isFullSize, canGoBack } = this.state

    const resize = () => {
      this.setState({
        isFullSize: !isFullSize,
      })
    }

    const handleNavigation = (e) => {
      this.setState({
        canGoBack: e.canGoBack
      })
    }

    const goBack = () => {
      this.nav.goBack()
    }

    return (
      <View>
        <LabelRow title="CONTENT" />
        <WebView
          ref={(c) => { this.nav = c }}
          source={{ uri: permalink }}
          mixedContentMode="always"
          style={{ height: isFullSize ? 600 : 300, width: '100%' }}
          onNavigationStateChange={handleNavigation}
          startInLoadingState
        />
        <View style={style.icons}>
          <Icon
            name="arrow-back"
            onPress={goBack}
            style={{ opacity: canGoBack ? '100' : '0', fontSize: 36, color: '#555', marginLeft: 10 }}
          />
          <Icon
            name={isFullSize ? 'fullscreen-exit' : 'fullscreen'}
            onPress={resize}
            type="MaterialCommunityIcons"
            style={style.resize}
          />
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  icons: {
    marginTop: -50,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  resize: {
    fontSize: 36,
    color: '#555',
    marginRight: 10
  }
})