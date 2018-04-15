import React from 'react'
import { ScrollView, SafeAreaView, View, Button } from 'react-native'
import { connect } from 'react-redux'
import APIKeyItem from './APIKeyItem'
import DrawerButton from '../navigation/DrawerButton'
import EmptyState from '../EmptyState'

@connect(
  state => ({
    apikeys: state.apikeys
  }),
  {
  },
)

export default class APIKeysList extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'API keys',
      drawerLabel: 'API Keys',
      headerLeft: (<DrawerButton navigation={navigation} />),
      headerRight: (
        <Button
          onPress={() => navigation.navigate('Add API key')}
          title="Add key"
        />
      ),
    }
  }

  render() {
    const { apikeys } = this.props

    return (
      <SafeAreaView style={style.container}>
        {apikeys.size && (
          <ScrollView style={style.list}>
            {apikeys.map(e => <APIKeyItem apikey={e} key={e.publicKey} />)}
          </ScrollView>
        )}
        {!apikeys.size && (
          <View>
            <EmptyState state={'no-key'} navigation={this.props.navigation} />
          </View>
        )}
      </SafeAreaView >
    );
  }
}

const style = {
  container: {
    alignItems: 'center',
    height: '100%',
  },
  list: {
    backgroundColor: '#f3f3f3',
    height: '100%',
  },
}
