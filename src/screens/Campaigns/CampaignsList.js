import React from 'react';
import { ScrollView, SafeAreaView, TouchableOpacity, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import MessageRow from '../../components/MessageRow'
import EmptyState from '../EmptyState'
import { getAllCampaigns } from '../../helpers/mailjet'

@connect(state => ({
  apikeys: state.apikeys
}))

export default class Campaigns extends React.Component {
  state = {
    campaigns: [],
    isLoading: false,
  }

  componentDidMount = async () => {
    const { apikeys } = this.props

    this.setState({
      isLoading: true,
    })

    const campaigns = await getAllCampaigns(apikeys.get(0))
    this.setState({
      campaigns,
      isLoading: false,
    })
  }

  render() {
    const { campaigns, isLoading } = this.state

    return (
      <SafeAreaView style={style.container}>
        {campaigns.length > 0 ? (
          <ScrollView>
            {campaigns.map((e) => {
              return (
                <TouchableOpacity
                  key={e.id}
                  onPress={() => this.props.navigation.navigate('Campaign', {
                    id: e.id,
                    title: e.title,
                    delivered: e.delivered,
                    opened: e.opened,
                    clicked: e.clicked,
                  })}
                >
                  <MessageRow
                    title={e.title}
                    subtitle={e.subject}
                    status={e.status}
                    date={e.date}
                    navigation={this.props.navigation}
                  />
                </TouchableOpacity>)
            })}
          </ScrollView>
        ) : isLoading ? (
          <View>
            <EmptyState state={'loading'} context={'Campaigns'} />
          </View>
        ) : (
          <View>
            <EmptyState state={'no-data'} context={'Campaigns'} navigation={this.props.navigation} />
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
