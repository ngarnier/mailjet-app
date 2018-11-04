import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text } from 'react-native'
import { Icon } from 'native-base'
import LeftRight from '../../components/LeftRight'
import StatsRow from '../../components/StatsRow'
import LoadingState from '../../components/LoadingState'
import { convertTimestamp } from '../../helpers/util'

@connect(state => ({
  apikeys: state.apikeys,
}))

export default class ContactList extends React.Component {
  state = {
    isLoading: false,
  }

  componentDidMount = async () => {
    // const { apikeys } = this.props
    // const { id } = this.props.navigation.state.params
    // this.setState({
    //   isLoading: true,
    // })

    // const listStats = await getListStats(apikeys.get(0), id)
    // this.setState({
    //   listStats,
    //   isLoading: false,
    // })
  }

  render() {
    const { isLoading } = this.state
    const {
      id,
      email,
      createdAt,
      lastActivityAt,
      deliveredCount,
    } = this.props.navigation.state.params

    return (
      <View style={{ flex: 1 }}>
        {isLoading ? (<LoadingState />) : (
          <View>
            <View style={style.row}>
              <Text style={style.title}>{email}</Text>
            </View>
            <View style={[style.bordered, { borderTopWidth: 0 }]}>
              <StatsRow
                sent={deliveredCount}
              />
            </View>
            <View style={{ paddingTop: 10, paddingBottom: 10, backgroundColor: '#fff' }}>
              <LeftRight left="Created on" right={convertTimestamp(Date.parse(new Date(createdAt)), 'short')} />
              <LeftRight left="Last active on" right={convertTimestamp(Date.parse(new Date(lastActivityAt)), 'short')} />
            </View>
            <View>
              <View style={[style.row, style.bordered]}>
                <View style={[style.columns, { paddingBottom: 5 }]}>
                  <Text style={style.label}>Contact Details</Text>
                  <Icon
                    name="arrow-forward"
                    onPress={() => this.props.navigation.navigate('ContactDetails', { id })}
                  />
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    )
  }
}

const style = StyleSheet.create({
  row: {
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 10,
  },
  columns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bordered: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  label: {
    fontSize: 16,
    color: '#444',
  },
})
