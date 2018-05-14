import React from 'react'
import { FlatList, SafeAreaView, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import ContactListItem from './ContactListItem'
import EmptyState from '../../components/EmptyState'
import { getLists } from '../../helpers/mailjet'

@connect(state => ({
  apikeys: state.apikeys,
}))

export default class ContactLists extends React.Component {
  state = {}

  componentDidMount = async () => {
    const { apikeys } = this.props

    this.setState({
      isLoading: true,
    })

    const lists = await getLists(apikeys.get(0))
    this.setState({
      lists: lists.length > 0 ? lists : false,
      isLoading: false,
    })
  }

  render() {
    const { lists, isLoading } = this.state

    return (
      <SafeAreaView style={style.container}>
        {lists ? (
          <FlatList
            data={lists}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <ContactListItem
                id={item.ID}
                name={item.Name}
                subscribers={item.SubscriberCount}
                key={item.ID}
                navigation={this.props.navigation}
              />)}
          />
        ) : isLoading ? (
          <View>
            <EmptyState state="loading" context="Contact Lists" />
          </View>
        ) : (
          <View>
            <EmptyState state="no-data" context="Contact Lists" />
          </View>
        )}
      </SafeAreaView>
    )
  }
}

const style = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#f6f6f6',
  },
})
