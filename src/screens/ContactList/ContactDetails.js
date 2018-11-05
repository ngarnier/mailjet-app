import React from 'react'
import { connect } from 'react-redux'
import { FlatList, View, StyleSheet } from 'react-native'
import { getContactProperties } from '../../helpers/mailjet'
import LeftRight from '../../components/LeftRight'
import LoadingState from '../../components/LoadingState'
import EmptyState from '../../components/EmptyState'

@connect(state => ({
  apikeys: state.apikeys,
}))

export default class ListContact extends React.Component {
  state = {
    properties: [],
    isLoading: true,
  }

  componentDidMount = async () => {
    const { apikeys } = this.props
    const { id } = this.props.navigation.state.params

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
          <LoadingState />
        ) : typeof properties === 'string' ? (
          <EmptyState tryAgain={() => this.loadMore('update')} state="network-issue" context="Contact details" />
        ) : properties.length === 0 ? (
          <EmptyState state="no-data" context="Contact details" />
        ) : (
          <FlatList
            data={properties}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <LeftRight left={item.Name} right={item.Value} />
            )}
          />)}
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
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
