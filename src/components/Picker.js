import React from 'react'
import { Modal, Text, TouchableHighlight, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Icon } from 'native-base'
import ModalPick from './ModalPick'
import { hideModal } from '../actions/modals'

@connect(state => ({
  modals: state.modals,
}), {
    hideModal,
  })

export default class ModalExample extends React.Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }

  render() {
    const { modals, hideModal } = this.props
    return (
      <Modal
        animationType="slide"
        visible={modals.campaigns}
      >
        <View style={style.modal}>
          <View style={style.titleRow}>
            <Text style={style.title}>Campaigns</Text>
            <Icon
              name="close"
              onPress={() => hideModal('campaigns')}
              style={{ color: '#999' }}
            />
          </View>
          <View>
            {['Drafts', 'Sent'].map(e => (<ModalPick status={e} state="active" />))}
          </View>
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

