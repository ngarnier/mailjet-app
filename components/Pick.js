import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native'
import { Icon } from 'native-base'
import setFilter from '../actions/filters'

@connect(state => ({
  filters: state.filters,
}), {
  setFilterConnect: setFilter,
})

export default class Pick extends React.Component {
  static propTypes = {
    setFilterConnect: PropTypes.func.isRequired,
    filters: PropTypes.objectOf(PropTypes.string).isRequired,
    pick: PropTypes.func.isRequired,
    context: PropTypes.string.isRequired,
  }

  toggleFilter = async (array) => {
    const { setFilterConnect, filters, context } = this.props
    let newFilter
    for (let i = 0; i < array.length; i += 1) {
      if (filters[context] === array[i]) {
        newFilter = array[i + 1] || array[0]
      }
    }
    await setFilterConnect(context, newFilter)
    this.props.pick()
  }

  render() {
    const { filters, context } = this.props
    const array = context === 'campaigns' ? ['Sent', 'Drafts'] :
      context === 'period' ? ['Month', 'Week', 'Day'] :
        []

    return (
      <View>
        <TouchableHighlight
          style={style.pick}
          underlayColor="#fff"
          onPress={() => this.toggleFilter(array)}
        >
          <View style={style.row}>
            <View style={{ flexDirection: 'column' }}>
              {array.map((filter, index) => (
                <Icon
                  key={index.toString()}
                  style={[style.icon, filter === filters[context] ? style.active : style.inactive]}
                  name="circle"
                  type="FontAwesome"
                />
              ))}
            </View>
            <Text style={style.filter}>
              {filters[context]}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

const style = StyleSheet.create({
  pick: {
    padding: 5,
    alignSelf: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filter: {
    marginLeft: 5,
    fontSize: 18,
    color: '#1FBE9F',
    fontWeight: '600',
  },
  icon: {
    fontSize: 10,
  },
  active: {
    color: '#1FBE9F',
  },
  inactive: {
    color: '#ddd',
  },
})
