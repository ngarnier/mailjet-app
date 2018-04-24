import React from 'react';
import { ScrollView, View, StyleSheet, Platform, StatusBar } from 'react-native'
import { Container, Header, Body, Title, Content } from 'native-base'
import CampaignItem from './CampaignItem'
import EmptyState from '../EmptyState'

export default class Campaigns extends React.Component {
  state = {}

  componentDidMount = async () => {
    this.setState({
      isLoading: true,
    })

    const campaigns = [{ id: 1, name: 'hello', senderName: 'Bill', senderEmail: 'Bill@bill.com', status: 'draft' }]
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
