import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import ContactLists from './ContactLists'
import { getLists } from '../../helpers/mailjet'

@connect(state => ({
  apikeys: state.apikeys,
}))

export default class Lists extends React.Component {
  state = {
    lists: undefined,
    isLoading: false,
  }

  componentDidMount = async () => {
    const { apikeys } = this.props

    this.setState({
      isLoading: true,
    })

    const lists = await getLists(apikeys.get(0))
    this.setState({
      lists,
      isLoading: false,
      isRefreshing: false,
    })
  }

  fetchLists = async (method) => {
    const { apikeys } = this.props

    if (method === 'update') {
      this.setState({
        isLoading: true,
      })
    } else {
      this.setState({
        isRefreshing: true,
      })
    }

    const lists = await getLists(apikeys.get(0))

    this.setState({
      lists,
      isLoading: false,
      isRefreshing: false,
    })
  }

  render() {
    const { navigation } = this.props
    const { lists, isLoading, isRefreshing } = this.state

    return (
      <SafeAreaView style={style.container}>
        <ContactLists
          navigation={navigation}
          refresh={method => this.fetchLists(method)}
          lists={lists}
          isLoading={isLoading}
          isRefreshing={isRefreshing}
        />
      </SafeAreaView>
    )
  }
}

const style = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#f6f6f6',
    flex: 1,
  },
})
