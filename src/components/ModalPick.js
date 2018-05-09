import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native'
import { Icon } from 'native-base'
import setFilter from '../actions/filters'
import { hideModal } from '../actions/modals'

@connect(state => ({
  filters: state.filters,
}), {
  setFilterConnect: setFilter,
  hideModalConnect: hideModal,
})

export default class ModalPick extends React.Component {
  static propTypes = {
    context: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired,
    filters: PropTypes.objectOf(PropTypes.string).isRequired,
    setFilterConnect: PropTypes.func.isRequired,
    hideModalConnect: PropTypes.func.isRequired,
  }

  handleFilter = (filter) => {
    const { setFilterConnect, hideModalConnect, context } = this.props
    setFilterConnect(context, filter)
    hideModalConnect(context)
  }

  render() {
    const { context, filter, filters } = this.props
    return (
      <TouchableHighlight
        onPress={() => this.handleFilter(filter)}
        underlayColor="#fafafa"
        style={style.highlight}
      >
        {context === 'campaigns' && (
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
              <Text style={style.filter}>{filter}</Text>
            </View>
            {filters[context] === filter && <Icon name="checkmark" style={style.active} />}
          </View>
        )}
      </TouchableHighlight>
    )
  }
}

const style = StyleSheet.create({
  highlight: {
    height: 26,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowStart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
  },
  filter: {
    marginLeft: 10,
    fontSize: 16,
  },
  active: {
    color: '#fda836',
  },
})

