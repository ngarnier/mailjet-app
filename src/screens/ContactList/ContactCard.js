import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Icon } from 'native-base'
import LeftRight from '../../components/LeftRight'
import StatsRow from '../../components/StatsRow'
import { convertTimestamp } from '../../helpers/util'

export default function ContactList({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <View>
        <View style={style.row}>
          <Text style={style.title}>{navigation.state.params.email}</Text>
        </View>
        <View style={[style.bordered, { borderTopWidth: 0 }]}>
          <StatsRow
            sent={navigation.state.params.deliveredCount}
          />
        </View>
        <View style={{ paddingTop: 10, paddingBottom: 10, backgroundColor: '#fff' }}>
          <LeftRight left="Created on" right={convertTimestamp(Date.parse(new Date(navigation.state.params.createdAt)), 'short')} />
          <LeftRight left="Last active on" right={convertTimestamp(Date.parse(new Date(navigation.state.params.lastActivityAt)), 'short')} />
        </View>
        <View>
          <View style={[style.row, style.bordered]}>
            <View style={[style.columns, { paddingBottom: 5 }]}>
              <Text style={style.label}>Contact Details</Text>
              <Icon
                name="arrow-forward"
                onPress={() => navigation.navigate('ContactDetails', { id: navigation.state.params.id })}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
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
