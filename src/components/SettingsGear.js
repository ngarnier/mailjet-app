import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon } from 'native-base'
import { showModal } from '../actions/modals'

@connect(null, {
  showModalConnected: showModal,
})

export default class SettingsGear extends React.Component {
  static propTypes = {
    showModalConnected: PropTypes.func.isRequired,
  }

  render() {
    const { showModalConnected } = this.props
    return (
      <Icon
        style={{ paddingRight: 10, color: '#1FBE9F' }}
        name="md-settings"
        onPress={() => showModalConnected('settings')}
      />
    )
  }
}
