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

export default class ModalPick extends React.Component {
  static propTypes = {
    setFilterConnect: PropTypes.func.isRequired,
    filters: PropTypes.objectOf(PropTypes.string).isRequired,
    pick: PropTypes.func.isRequired,
  }

  toggleFilter = async () => {
    const { setFilterConnect, filters } = this.props
    const filter = filters.campaigns === 'Drafts' ? 'Sent' : 'Drafts'
    await setFilterConnect('campaigns', filter)
    this.props.pick()
  }

  render() {
    const { filters } = this.props
    return (
      <View style={{
        backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee',
      }}
      >
        <TouchableHighlight
          style={style.pick}
          underlayColor="#fff"
          onPress={() => this.toggleFilter()}
        >
          <View style={style.row}>
            <View>
              <Icon
                style={{ fontSize: 10, color: filters.campaigns === 'Sent' ? '#1FBE9F' : '#ddd' }}
                name="circle"
                type="FontAwesome"
              />
              <Icon
                style={{ fontSize: 10, color: filters.campaigns === 'Drafts' ? '#1FBE9F' : '#ddd' }}
                name="circle"
                type="FontAwesome"
              />
            </View>
            <Text style={style.filter}>
              {filters.campaigns}
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
    marginLeft: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
  },
  filter: {
    marginLeft: 5,
    fontSize: 20,
    color: '#1FBE9F',
    fontWeight: '600',
  },
})
