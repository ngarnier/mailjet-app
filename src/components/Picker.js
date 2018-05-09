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
  }

  render() {
    const { modals, hideModalConnect, context } = this.props
    return (
      <Modal
        animationType="slide"
        visible={modals[context]}
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
              <ModalPick context={context} filter="Drafts" />
              <ModalPick context={context} filter="Sent" />
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#999',
    paddingBottom: 5,
  },
})

