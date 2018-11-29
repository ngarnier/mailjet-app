import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Feather } from '@expo/vector-icons'
import { removeApiKey } from '../actions/apikeys'

@connect(null, {
  removeApiKeyConnected: removeApiKey,
})

export default class SettingsGear extends React.Component {
  static propTypes = {
    removeApiKeyConnected: PropTypes.func.isRequired,
  }

  render() {
    const { removeApiKeyConnected } = this.props
    return (
      <Feather
        name="log-out"
        color="green"
        style={{ fontSize: 28, paddingRight: 10, color: '#1FBE9F' }}
        onPress={() => removeApiKeyConnected()}
      />
    )
  }
}
