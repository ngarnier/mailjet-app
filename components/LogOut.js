import React from 'react'
import { Alert } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Feather } from '@expo/vector-icons'
import { removeApiKey } from '../actions/apikeys'

@connect(null, {
  removeApiKeyConnected: removeApiKey,
})

export default class LogOut extends React.Component {
  static propTypes = {
    removeApiKeyConnected: PropTypes.func.isRequired,
  }

  displayAlert = () => {
    const { removeApiKeyConnected } = this.props

    Alert.alert(
      'Log out',
      'Are you sure you want to log out of your Mailjet account?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        { text: 'OK', onPress: () => removeApiKeyConnected() },
      ],
    )
  }

  render() {
    return (
      <Feather
        name="log-out"
        color="green"
        style={{ fontSize: 28, paddingRight: 10, color: '#1FBE9F' }}
        onPress={() => this.displayAlert()}
      />
    )
  }
}
