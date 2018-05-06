import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, ScrollView, View, Text } from 'react-native'
import { Content } from 'native-base'
import EmptyState from '../../components/EmptyState'
import { getListContacts } from '../../helpers/mailjet'

@connect(state => ({
  apikeys: state.apikeys
}))

export default class ListContact extends React.Component {
  state = {}

  componentDidMount = async () => {
    const { apikeys } = this.props
    const { Name } = this.props.navigation.state.params

    this.setState({
      isLoading: true,
    })

    const contacts = await getListContacts(apikeys.get(0), Name)
    this.setState({
      contacts: contacts.length > 0 ? contacts : false,
      isLoading: false,
    })
  }

  render() {
    const { contacts, isLoading } = this.state

    return (
      <Content>
        {contacts ? (
          <ScrollView>
            {contacts.map((e) => {
              return (
                <View style={style.row} key={e.id}>
                  <Text style={style.label}>{e.email}</Text>
                </View>
              )
            })}
          </ScrollView>
        ) : isLoading ? (
          <EmptyState state={'loading'} context={'Contacts'} />
        ) : (
          <EmptyState state={'no-data'} context={'Contacts'} />
        )}
      </Content>
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
  label: {
    fontSize: 16,
    color: '#444',
  },
})