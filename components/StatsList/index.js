import React from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import StatsItem from './StatsItem'
import EmptyState from '../EmptyState'
import DrawerButton from '../navigation/DrawerButton'
import { getAllCampaigns, getAllStats } from '../../helpers/mailjet'

@connect(state => ({
  apikeys: state.apikeys
}))

export default class StatsList extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Statistics',
      headerLeft: (<DrawerButton navigation={navigation} />),
    }
  }

  state = []

  componentDidMount = async () => {
    const { apikeys } = this.props

    this.setState({
      isLoading: true,
    })

    const campaigns = await getAllCampaigns(apikeys)
    const stats = await getAllStats(campaigns)
    this.setState({
      stats: stats.length > 0 ? stats.reverse() : false,
      isLoading: false,
    })
  }

  render() {
    const { stats, isLoading } = this.state

    return (
      <SafeAreaView style={style.container}>
        {stats && (
          <ScrollView>
            {stats.map(e => (<StatsItem campaign={e} key={e.id} />))}
          </ScrollView>
        )}
        {isLoading && (
          <View>
            <EmptyState state={'loading'} />
          </View>
        )}
        {!stats && !isLoading && (
          <View>
            <EmptyState state={'no-key'} navigation={this.props.navigation} />
          </View>
        )}
      </SafeAreaView>

    )
  }
}

const style = StyleSheet.create({
  container: {
    height: '100%',
  },
})
