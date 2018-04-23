import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, ScrollView, View, Text } from 'react-native'
import { Content } from 'native-base'
import EmptyState from '../EmptyState'
import { getListContacts } from '../../helpers/mailjet'

@connect(state => ({
  apikeys: state.apikeys
}))

export default class ListContact extends React.Component {
  state = {}

  componentDidMount = async () => {
    const { apikeys } = this.props
    const { name } = this.props.navigation.state.params

    this.setState({
      isLoading: true,
    })

    const contacts = await getListContacts(apikeys.get(0), name)
    this.setState({
      contacts,
      isLoading: false,
    })
  }

  render() {
    const { contacts, isLoading } = this.state

    return (
      <Content>
        {!!contacts && (
          <ScrollView>
            {contacts.map((e) => {
              return (
                <View style={style.row}>
                  <Text style={style.label}>{e}</Text>
                </View>
              )
            })}
          </ScrollView>
        )}
        {!!isLoading && (
          <View>
            <EmptyState state={'loading'} context={'Contacts'} />
          </View>
        )}
        {!contacts && !isLoading && (
          <View>
            <EmptyState state={'no-data'} context={'Contacts'} />
          </View>
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
