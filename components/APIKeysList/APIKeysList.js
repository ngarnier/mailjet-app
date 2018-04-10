import React from 'react'
import { ScrollView, SafeAreaView, View, Button } from 'react-native'
import APIKeyItem from './APIKeyItem'
import { listKeys } from '../../helpers/apikey'
import DrawerButton from '../navigation/DrawerButton'
import EmptyState from '../EmptyState'

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

  state = {
    publicKeys: []
  }

  async componentDidMount() {
    const publicKeys = await listKeys()
    this.setState({
      publicKeys
    })
  }

  render() {
    const { publicKeys } = this.state

    return (
      <SafeAreaView style={style.container}>
        {publicKeys.length > 0 ?
          publicKeys.map((e, i) => (
            <ScrollView style={style.list}>
              <APIKeyItem publicKey={e} key={i} />
            </ScrollView>)) :
          <View>
            <EmptyState state={'no-key'} navigation={this.props.navigation} />
          </View>
        }
      </SafeAreaView>
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
