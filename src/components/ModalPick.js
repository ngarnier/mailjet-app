import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native'
import { Icon } from 'native-base'
import setFilter from '../actions/filters'
import { hideModal } from '../actions/modals'
import { removeApiKey } from '../actions/apikeys'

@connect(state => ({
  filters: state.filters,
}), {
  setFilterConnect: setFilter,
  hideModalConnect: hideModal,
  removeApiKey,
})

export default class ModalPick extends React.Component {
  static propTypes = {
    context: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired,
    filters: PropTypes.objectOf(PropTypes.string).isRequired,
    setFilterConnect: PropTypes.func.isRequired,
    hideModalConnect: PropTypes.func.isRequired,
    removeApiKey: PropTypes.func.isRequired,
    onPick: PropTypes.func.isRequired,
  }

  handleFilter = async (filter) => {
    const { setFilterConnect, hideModalConnect, context } = this.props
    await setFilterConnect(context, filter)
    hideModalConnect(context)
    this.props.onPick()
  }

  handleDisconnect = async () => {
    await this.props.removeApiKey()
  }

  render() {
    const { context, filter, filters } = this.props
    return (
      <TouchableHighlight
        onPress={context === 'settings' ? () => this.handleDisconnect() : () => this.handleFilter(filter)}
        underlayColor="#fafafa"
      >
        {context === 'campaigns' ? (
          <View style={style.row}>
            <View style={style.rowStart}>
              {filter === 'Sent' && (
                <Icon
                  name="check"
                  type="MaterialCommunityIcons"
                  style={filters[context] === filter ? [style.icon, style.active] : style.icon}
                />
              )}
              {filter === 'Drafts' && (
                <Icon
                  name="pencil"
                  type="MaterialCommunityIcons"
                  style={filters[context] === filter ? [style.icon, style.active] : style.icon}
                />
              )}
              <Text
                style={filters[context] === filter ? [style.filter, style.active] : style.filter}
              >
                {filter}
              </Text>
            </View>
            {filters[context] === filter && <Icon name="checkmark" style={style.active} />}
          </View>
        ) : context === 'settings' && (
          <View>
            <Text style={style.filter}>
              {filter}
            </Text>
          </View>
        )}
      </TouchableHighlight>
    )
  }
}

const style = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 32,
  },
  rowStart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    color: '#444',
  },
  filter: {
    marginLeft: 10,
    fontSize: 18,
    color: '#222',
  },
  active: {
    color: '#fda836',
  },
})

