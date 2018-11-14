import React from 'react'
import { connect } from 'react-redux'
import { FlatList, View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import EmptyState from '../../../components/EmptyState'
import { getListContacts } from '../../../helpers/mailjet'
import LoadingState from '../../../components/LoadingState'

@connect(state => ({
  apikeys: state.apikeys,
}))

export default class ListContact extends React.Component {
  state = {
    contacts: [],
    isLoading: false,
    isLoadingMore: false,
    isRefreshing: false,
    offset: 0,
    canLoadMore: true,
  }

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
      canLoadMore: typeof contacts === 'object' ? contacts.length === 20 : false,
    })
  }

  loadMore = async (method) => {
    const { apikeys } = this.props
    const { name } = this.props.navigation.state.params
    const {
      offset, contacts, canLoadMore,
    } = this.state

    if (method === 'update') {
      this.setState({
        offset: 0,
        isLoading: true,
      })

      const updatedContacts = await getListContacts(apikeys.get(0), name)

      this.setState({
        contacts: updatedContacts,
        isLoading: false,
        isLoadingMore: false,
        canLoadMore: typeof updatedContacts === 'object' ? updatedContacts.length === 20 : false,
      })
    } else if (method === 'load more' && canLoadMore) {
      this.setState({
        isLoadingMore: true,
      })

      const newContacts = await getListContacts(apikeys.get(0), name, offset + 20)

      if (typeof newContacts === 'object') {
        this.setState({
          contacts: [...contacts, ...newContacts],
          offset: offset + 20,
          canLoadMore: typeof newContacts === 'object' ? newContacts.length === 20 : false,
          isLoadingMore: false,
        })
      }
    } else if (method === 'refresh') {
      this.setState({
        isRefreshing: true,
      })

      const refreshedContacts = await getListContacts(apikeys.get(0), name)

      this.setState({
        contacts: refreshedContacts,
        isRefreshing: false,
        isLoadingMore: false,
        canLoadMore: typeof refreshedContacts === 'object' ? refreshedContacts.length === 20 : false,
      })
    }
  }

  render() {
    const {
      contacts, isLoading, isLoadingMore, isRefreshing,
    } = this.state
    const { navigation } = this.props

    return (
      <View style={style.container}>
        {isLoading && !isRefreshing ? (
          <LoadingState />
        ) : typeof contacts === 'string' ? (
          <EmptyState tryAgain={() => this.loadMore('update')} state="network-issue" context="Contacts" />
        ) : contacts.length === 0 ? (
          <EmptyState state="no-data" context="subscribed contact" />
        ) : (
          <FlatList
            data={contacts}
            keyExtractor={(item, index) => index.toString()}
            refreshing={isRefreshing}
            onRefresh={() => this.loadMore('refresh')}
            onEndReachedThreshold={0.1}
            onEndReached={() => this.loadMore('load more')}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Contact', {
                  createdAt: item[0].CreatedAt,
                  deliveredCount: item[0].DeliveredCount,
                  email: item[0].Email,
                  id: item[0].ID,
                  lastActivityAt: item[0].LastActivityAt,
                })}
              >
                <View style={style.row} key={item[0].ID}>
                  <Text style={style.label}>{item[0].Email}</Text>
                </View>
              </TouchableOpacity>
              )}
          />)}
        {isLoadingMore && (
          <View style={style.loader}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  row: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderBottomWidth: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    color: '#444',
  },
})
