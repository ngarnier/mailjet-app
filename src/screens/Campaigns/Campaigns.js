import React from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import FilterRow from '../../components/FilterRow'
import Picker from '../../components/Picker'
import CampaignsList from './CampaignsList'

@connect(state => ({
  filters: state.filters,
}))

export default class Campaigns extends React.Component {
  static propTypes = {
    filters: PropTypes.objectOf(PropTypes.string).isRequired,
  }

  render() {
    const { filters, navigation } = this.props

    return (
      <SafeAreaView style={style.container}>
        <FilterRow filter={filters.campaigns} />
        <CampaignsList filter={filters.campaigns} navigation={navigation} />
        <Picker context="campaigns" />
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