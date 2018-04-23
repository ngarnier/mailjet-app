import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native'
import { Container, Header, Body, Title, Content } from 'native-base'
import { connect } from 'react-redux'
import ContactListItem from './ContactListItem'
import EmptyState from '../EmptyState'
import { getLists } from '../../helpers/mailjet'

@connect(state => ({
  apikeys: state.apikeys
}))

export default class ContactLists extends React.Component {
  state = {}

  componentDidMount = async () => {
    const { apikeys } = this.props

    this.setState({
      isLoading: true,
    })

    const lists = await getLists(apikeys.get(0))
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
