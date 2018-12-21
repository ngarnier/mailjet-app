import React from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native'
import LeftRight from '../../../components/LeftRight'
import StatsRow from '../../../components/StatsRow'
import ContactDetails from '../../../components/ContactDetails'
import { convertTimestamp } from '../../../helpers/util'

export default class ContactList extends React.PureComponent {
  state = {
    detailsShown: false,
  }

  toggleState = () => {
    this.setState({
      detailsShown: !this.state.detailsShown,
    })
  }

  render() {
    const { detailsShown } = this.state
    const { navigation } = this.props

    return (
      <ScrollView style={{ flex: 1 }}>
        <View>
          <View style={style.row}>
            <Text style={style.title}>{navigation.state.params.email}</Text>
          </View>
          <View style={[style.bordered, { borderTopWidth: 0 }]}>
            <StatsRow
              source="Contact"
              extraData={{ sent: navigation.state.params.deliveredCount }}
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
                <Text
                  onPress={() => this.toggleState()}
                  style={{ color: '#1FBE9F', fontSize: 17 }}
                >
                  {detailsShown ? 'Hide' : 'Show'}
                </Text>
              </View>
            </View>
          </View>
          {detailsShown && (
            <ContactDetails id={navigation.state.params.id} />
          )}
        </View>
      </ScrollView>
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
    fontSize: 17,
    fontFamily: 'System',
    fontWeight: 'bold',
    color: '#222',
  },
  label: {
    fontSize: 16,
    color: '#444',
  },
})
