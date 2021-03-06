import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text } from 'react-native'
import { Icon } from 'native-base'
import StatsRow from '../../../components/StatsRow'
import { getObjectStats } from '../../../helpers/mailjet'
import LoadingState from '../../../components/LoadingState'

@connect(state => ({
  apikeys: state.apikeys,
}))

export default class ContactList extends React.Component {
  state = {}

  componentDidMount = async () => {
    const { apikeys } = this.props
    const { id } = this.props.navigation.state.params
    this.setState({
      isLoading: true,
    })

    const listStats = await getObjectStats(apikeys.get(0), 'List', id)
    this.setState({
      listStats,
      isLoading: false,
    })
  }

  render() {
    const { id, name, subscribers } = this.props.navigation.state.params
    const { listStats, isLoading } = this.state

    return (
      <View style={{ flex: 1 }}>
        {isLoading ? (<LoadingState />) : (
          <View>
            <View style={style.row}>
              <Text style={style.title}>{name}</Text>
            </View>
            <View style={[style.row, style.columns, { borderBottomWidth: 0 }]}>
              <View>
                <Text style={style.label}>Contacts</Text>
                <Text style={style.title}>{subscribers}</Text>
              </View>
              <View>
                <Icon
                  name="arrow-forward"
                  onPress={() => this.props.navigation.navigate('ListContacts', { name })}
                />
              </View>
            </View>
            {listStats && (
              <View>
                <StatsRow
                  source="List"
                  id={id}
                />
                <View style={[style.row, { borderTopColor: '#ddd', borderTopWidth: 1 }]}>
                  <View style={[style.columns, { paddingBottom: 5 }]}>
                    <Text style={style.label}>Contacts</Text>
                    <Text style={style.figure}>{subscribers}</Text>
                  </View>
                  <View style={[style.columns, { paddingBottom: 5 }]}>
                    <Text style={style.label}>Unsubscribed contacts</Text>
                    <Text style={style.figure}>{listStats.unsub}</Text>
                  </View>
                </View>
              </View>)
            }
          </View>)}
      </View>
    )
  }
}

const style = StyleSheet.create({
  row: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderBottomWidth: 1,
    padding: 20,
  },
  columns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 17,
    fontFamily: 'System',
    fontWeight: 'bold',
    color: '#222',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: 'bold',
    color: '#222',
    paddingTop: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: 'System',
    color: '#444',
  },
  figure: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'System',
  },
  emptyBar: {
    backgroundColor: '#eee',
    height: 4,
    width: '100%',
    marginBottom: 5,
    marginTop: 5,
  },
  filledBar: {
    backgroundColor: '#55FDA3',
    height: '100%',
  },
})
