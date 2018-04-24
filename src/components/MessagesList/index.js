import React from 'react';
import { ScrollView, View, StyleSheet, Platform, StatusBar } from 'react-native'
import { Container, Header, Body, Title, Content } from 'native-base'
import MessageItem from './MessageItem'
import EmptyState from '../EmptyState'

export default class MessagesList extends React.Component {
  state = {}

  componentDidMount = async () => {
    this.setState({
      isLoading: true,
    })

    const messages = []
    this.setState({
      messages: messages.length > 0 ? messages.reverse() : false,
      isLoading: false,
    })
  }

  render() {
    const { messages, isLoading } = this.state

    return (
      <Container>
        <Header style={{
            paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
          }}
        >
          <Body>
            <Title>Transactional</Title>
          </Body>
        </Header>
        <Content style={style.container}>
          {messages && (
            <ScrollView>
              {messages.map(e => (<MessageItem message={e} key={e.messageID} />))}
            </ScrollView>
          )}
          {isLoading && (
            <View>
              <EmptyState state={'loading'} context={'Messages'} />
            </View>
          )}
          {!messages && !isLoading && (
            <View>
              <EmptyState state={'no-data'} context={'Messages'} navigation={this.props.navigation} />
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
