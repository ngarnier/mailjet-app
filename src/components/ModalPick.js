import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, StyleSheet } from 'react-native'
import { Icon } from 'native-base'

export default function ModalPick({ status, state }) {
  return (
    <View style={style.row}>
      <View style={style.rowStart}>
        {status === 'Drafts' && (
          <Icon
            name="pencil"
            type="MaterialCommunityIcons"
            style={style.materialIcon}
          />
        )}
        {status === 'Sent' && <Icon name="checkmark" style={style.icon} />}
        <Text style={style.status}>{status}</Text>
      </View>
      {state === 'active' && (<Icon name="checkmark" style={style.icon} />)}
    </View>
  )
}

ModalPick.propTypes = {
  status: PropTypes.string.isRequired,
  state: PropTypes.string,
}

ModalPick.defaultProps = {
  state: 'inactive',
}

const style = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowStart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  materialIcon: {
    fontSize: 18,
  },
  icon: {
    fontSize: 40,
  },
  status: {
    marginLeft: 10,
    fontSize: 16,
  },
})

