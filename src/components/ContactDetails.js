import React from 'react'
import { connect } from 'react-redux'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { getContactProperties } from '../helpers/mailjet'
import LeftRight from './LeftRight'
import EmptyState from './EmptyState'

@connect(state => ({
  apikeys: state.apikeys,
}))

export default class ContactDetails extends React.Component {
  state = {
    properties: [],
    isLoading: true,
  }

  componentDidMount = async () => {
    const { apikeys } = this.props
    const { id } = this.props

    const properties = await getContactProperties(apikeys.get(0), id)

    this.setState({
      properties,
      isLoading: false,
    })
  }

  render() {
    const { properties, isLoading } = this.state

    return (
      <View style={style.container}>
        {isLoading ? (
          <ActivityIndicator style={{ paddingTop: 10 }} size="large" />
        ) : typeof properties === 'string' ? (
          <EmptyState tryAgain={() => this.loadMore('update')} state="network-issue" context="Contact details" />
        ) : properties.length === 0 ? (
          <EmptyState state="no-data" context="Contact details" />
        ) : (
          properties.map((property, index) => (<LeftRight
            key={index.toString()}
            left={property.Name}
            right={property.Value}
            padding
          />))
        )}
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
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
