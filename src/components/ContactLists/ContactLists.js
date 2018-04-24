import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native'
import { Container, Header, Body, Title, Content } from 'native-base'
import ContactListItem from './ContactListItem'
import EmptyState from '../EmptyState'

export default class ContactLists extends React.Component {
  state = {}

  componentDidMount = async () => {
    this.setState({
      isLoading: true,
    })

    const lists = [{ ID: 42, Name: 'Hello world', SubscriberCount: 1337 }]
    this.setState({
      lists: lists.length > 0 ? lists : false,
      isLoading: false,
    })
  }

  render() {
    const { lists, isLoading } = this.state

    return (
      <Container>
        <Header>
          <Body>
            <Title>Contact Lists</Title>
          </Body>
        </Header>
        <Content style={style.container}>
          {lists ? (
            <ScrollView>
              {lists.map((e) => {
                return (<ContactListItem list={e} key={e.ID} navigation={this.props.navigation} />)
              })}
            </ScrollView>
          ) : isLoading ? (
            <View>
              <EmptyState state={'loading'} context={'Contact Lists'} />
            </View>
          ) : (
            <View>
              <EmptyState state={'no-data'} context={'Contact Lists'} />
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
