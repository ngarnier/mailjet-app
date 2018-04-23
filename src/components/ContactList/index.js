import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Icon } from 'native-base'

export default class ContactList extends React.Component {
  render() {
    const {
      id,
      name,
      total,
      active,
      unsub,
      delivered,
      opened,
      clicked } = this.props.navigation.state.params

    return (
      <View>
        <View style={style.row}>
          <Text style={style.title}>{name}</Text>
        </View>
        <View style={[style.row, style.columns]}>
          <View>
            <Text style={style.label}>Contacts</Text>
            <Text style={style.title}>{total}</Text>
          </View>
          <View>
            <Icon
              name="arrow-forward"
              onPress={() => this.props.navigation.navigate('ListContacts', { id, name })}
            />
          </View>
        </View>
        <View style={style.row}>
          <Text style={style.label}>Total emails sent</Text>
          <Text style={style.title}>{delivered}</Text>
          <View style={style.columns}>
            <View style={{ width: '48%' }}>
              <Text style={style.subtitle}>{opened}</Text>
              <View style={style.emptyBar}>
                <View style={[style.filledBar, { width: `${opened}` }]} />
              </View>
              <Text>Opens</Text>
            </View>
            <View style={{ width: '48%' }}>
              <Text style={style.subtitle}>{clicked}</Text>
              <View style={style.emptyBar}>
                <View style={[style.filledBar, { width: `${opened}` }]} />
              </View>
              <Text>Clicks</Text>
            </View>
          </View>
        </View>
        <View style={style.row}>
          <View style={[style.columns, { paddingBottom: 5 }]}>
            <Text style={style.label}>Total number of contacts</Text>
            <Text style={style.figure}>{total}</Text>
          </View>
          <View style={[style.columns, { paddingBottom: 5 }]}>
            <Text style={style.label}>Subscribed contacts</Text>
            <Text style={style.figure}>{active}</Text>
          </View>
          <View style={[style.columns, { paddingBottom: 5 }]}>
            <Text style={style.label}>Unsubscribed contacts</Text>
            <Text style={style.figure}>{unsub}</Text>
          </View>
        </View>
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222'
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    paddingTop: 10,
  },
  label: {
    fontSize: 16,
    color: '#444',
  },
  figure: {
    color: '#222',
    fontWeight: 'bold',
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
  }
})
