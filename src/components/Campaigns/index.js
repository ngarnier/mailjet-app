import React from 'react';
import { ScrollView, View, StyleSheet, Platform, StatusBar } from 'react-native'
import { Container, Header, Body, Title, Content } from 'native-base'
import { connect } from 'react-redux'
import CampaignItem from './CampaignItem'
import EmptyState from '../EmptyState'
import { getAllCampaigns } from '../../helpers/mailjet'

@connect(state => ({
  apikeys: state.apikeys
}))

export default class Campaigns extends React.Component {
  state = {}

  componentDidMount = async () => {
    const { apikeys } = this.props

    this.setState({
      isLoading: true,
    })

    const campaigns = await getAllCampaigns(apikeys.get(0))
    this.setState({
      campaigns: campaigns.length > 0 ? campaigns.reverse() : false,
      isLoading: false,
    })
  }

  render() {
    const { campaigns, isLoading } = this.state

    return (
      <Container>
        <Header
          style={{
            paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
          }}
        >
          <Body>
            <Title>Campaigns</Title>
          </Body>
        </Header>
        <Content style={style.container}>
          {campaigns ? (
            <ScrollView>
              {campaigns.map(e => (<CampaignItem campaign={e} key={e.id} />))}
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
        </Content>
      </Container>
    )
  }
}

const style = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#f6f6f6'
  },
})
