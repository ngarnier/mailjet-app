import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
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

  refresh = async () => {
    const { apikeys, source } = this.props

    this.setState({
      isLoading: true,
    })

    const data = source === 'emails' ?
      await getTotalSent(apikeys.get(0)) : await getTotalContacts(apikeys.get(0))

    this.setState({
      data,
      isLoading: false,
    })
  }

  render() {
    const { source, navigation } = this.props
    const { isLoading, data } = this.state
    return (
      <View style={style.card}>
        <TouchableOpacity
          onPress={source === 'emails' && !isLoading && data !== 'The request timed out' ?
            () => navigation.navigate('Campaigns') :
            source === 'contacts' && !isLoading && data !== 'The request timed out' ?
              () => navigation.navigate('Contacts') :
                () => { this.refresh() }}
        >
          <View>
            <Text style={style.title}>
              {source === 'emails' ? 'Emails Sent' : 'Contacts'}
            </Text>
            <Text style={style.figure} >
              {isLoading ?
                'Loading...' : data || `No ${source}`}
            </Text>
          </View>
        </TouchableOpacity>
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
    paddingTop: 10,
    paddingRight: 15,
    paddingBottom: 10,
    paddingLeft: 15,
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  figure: {
    color: '#1FBE9F',
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'System',
  },
})
