import React from 'react'
import { connect } from 'react-redux'
import { View, WebView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Icon } from 'native-base'
import LabelRow from './LabelRow'
import changePreviewSize from '../actions/preview'

@connect(state => ({
  previewIsFullSize: state.preview.previewIsFullSize,
}), {
  changePreviewSizeConnect: changePreviewSize,
})

export default class Preview extends React.Component {
  static propTypes = {
    permalink: PropTypes.string.isRequired,
    previewIsFullSize: PropTypes.bool.isRequired,
  }

  state = {
    canGoBack: false,
  }

  resize = async () => {
    const { changePreviewSizeConnect, previewIsFullSize } = this.props
    await changePreviewSizeConnect(!previewIsFullSize)
  }

  render() {
    const { permalink, previewIsFullSize } = this.props
    const { canGoBack } = this.state

    const goBack = () => {
      this.nav.goBack()
    }

    const handleNavigation = (e) => {
      this.setState({
        canGoBack: e.canGoBack,
      })
    }

    return (
      <View style={{ flex: 1 }}>
        <LabelRow title="CONTENT" />
        <View style={style.topView} />
        <WebView
          ref={(c) => { this.nav = c }}
          source={{ uri: permalink }}
          mixedContentMode="always"
          style={{ width: '100%', marginBottom: 10 }}
          onNavigationStateChange={handleNavigation}
          startInLoadingState
        />
        <View style={style.icons}>
          <Icon
            name="arrow-back"
            onPress={goBack}
            style={{
              opacity: canGoBack ? 100 : 0, fontSize: 36, color: '#555', marginLeft: 10,
            }}
          />
          <Icon
            name={previewIsFullSize ? 'fullscreen-exit' : 'fullscreen'}
            onPress={() => this.resize()}
            type="MaterialCommunityIcons"
            style={style.resize}
          />
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  topView: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginTop: 10,
  },
  icons: {
    marginTop: -50,
    marginBottom: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  resize: {
    fontSize: 36,
    color: '#555',
    marginRight: 10,
  },
})
