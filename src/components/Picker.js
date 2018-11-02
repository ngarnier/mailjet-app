import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Icon } from 'native-base'
import ModalPick from './ModalPick'
import { hideModal } from '../actions/modals'

@connect(state => ({
  modals: state.modals,
}), {
  hideModalConnect: hideModal,
})

export default class Picker extends React.Component {
  static propTypes = {
    modals: PropTypes.objectOf(PropTypes.bool).isRequired,
    hideModalConnect: PropTypes.func.isRequired,
    context: PropTypes.string.isRequired,
    pick: PropTypes.func.isRequired,
  }

  render() {
    const { modals, hideModalConnect, context } = this.props
    return (
      <Modal
        animationType="slide"
        visible={modals[context]}
        onRequestClose={() => undefined}
      >
        <View style={style.modal}>
          <View style={style.titleRow}>
            <Text style={style.title}>{context}</Text>
            <Icon
              name="close"
              onPress={() => hideModalConnect(context)}
              style={{ color: '#999' }}
            />
          </View>
          {context === 'campaigns' && (
            <View>
              <ModalPick onPick={this.props.pick} context={context} filter="Drafts" />
              <ModalPick onPick={this.props.pick} context={context} filter="Sent" />
            </View>
          )}
          {context === 'messages' && (
            <View>
              <ModalPick onPick={this.props.pick} context={context} filter="Sent" />
              <ModalPick onPick={this.props.pick} context={context} filter="Opened" />
              <ModalPick onPick={this.props.pick} context={context} filter="Clicked" />
              <ModalPick onPick={this.props.pick} context={context} filter="Queued" />
              <ModalPick onPick={this.props.pick} context={context} filter="Bounce" />
              <ModalPick onPick={this.props.pick} context={context} filter="Blocked" />
              <ModalPick onPick={this.props.pick} context={context} filter="Spam" />
            </View>
          )}
          {context === 'settings' && (
            <View>
              <ModalPick onPick={this.props.pick} context={context} filter="Log out" />
            </View>
          )}
        </View>
      </Modal>
    )
  }
}

const style = StyleSheet.create({
  modal: {
    marginTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#999',
    paddingBottom: 5,
  },
})

