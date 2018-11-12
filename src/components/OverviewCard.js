import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'
import { getTotalSent, getTotalContacts } from '../helpers/mailjet'

@connect(state => ({
  apikeys: state.apikeys,
}))

export default class OverviewCard extends React.Component {
  state = {
    isLoading: true,
  }

  componentDidMount = async () => {
    const { apikeys, source } = this.props

    const data = source === 'emails' ?
      await getTotalSent(apikeys.get(0)) : await getTotalContacts(apikeys.get(0))

    this.setState({
      data,
      isLoading: false,
    })
  }

  render() {
    const { source } = this.props
    const { isLoading, data } = this.state
    return (
      <View style={style.card}>
        <View>
          <Text style={style.title}>
            {source === 'emails' ? 'Emails Sent' : 'Contacts'}
          </Text>
          <Text style={style.figure} >
            {isLoading ?
              'Loading...' : data || `No ${source}`}
          </Text>
        </View>
      </View>
    )
  }
}

OverviewCard.propTypes = {
  source: PropTypes.string.isRequired,
}

const style = StyleSheet.create({
  card: {
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  figure: {
    color: '#1FBE9F',
    fontSize: 18,
    fontWeight: '600',
  },
})
