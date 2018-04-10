import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native'
import { Form, Item, Input, Button, Text, Spinner } from 'native-base'
import { storeKey } from '../helpers/apikey'
import { checkAuth, getMailjetKeys } from '../helpers/mailjet';

export default class StatsList extends React.Component {
  static navigationOptions = {
    title: 'Add API key',
  }

  state = {
    publicKey: '',
    secretKey: '',
  }

  handlePublicInput = (publicKey) => {
    this.setState({
      invalidKeys: false,
      publicKey
    })
  }

  handleSecretInput = (secretKey) => {
    this.setState({
      invalidKeys: false,
      secretKey
    })
  }

  handleSave = async () => {
    const { publicKey, secretKey } = this.state

    this.setState({
      isLoading: true
    })

    const auth = await checkAuth(publicKey, secretKey)
    if (auth.ErrorMessage) {
      this.setState({
        invalidKeys: true,
        isLoading: false,
      })
    } else {
      const mailjetKeys = await getMailjetKeys(publicKey, secretKey)
      await storeKey(mailjetKeys)

      this.setState({
        publicKey: '',
        secretKey: '',
      })
      this.props.navigation.navigate('API keys')
    }
  }

  render() {
    const { publicKey, secretKey, invalidKeys, isLoading } = this.state

    return (
      <SafeAreaView>
        <Form>
          <Item>
            <Input
              placeholder={'Public API Key'}
              onChangeText={publicKey => this.handlePublicInput(publicKey)}
              clearButtonMode={'while-editing'}
            />
          </Item>
          <Item last>
            <Input
              placeholder={'Secret API Key'}
              onChangeText={secretKey => this.handleSecretInput(secretKey)}
              clearButtonMode={'while-editing'}
            />
          </Item>
        </Form>
        <View style={style.warning}>
          {invalidKeys && (
            <Text style={style.warningText}>Invalid credentials</Text>
          )}
        </View>
        <View style={style.container}>
          <Button
            disabled={!publicKey || !secretKey}
            style={style.button}
            onPress={() => this.handleSave()}
          >
            {isLoading && (<Spinner size="small" color="white" />)}
            {!isLoading && (<Text>Add API Key</Text>)}
          </Button>

        </View>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  warning: {
    height: 40
  },
  warningText: {
    margin: 10,
    color: 'red',
    justifyContent: 'center',
  },
  button: {
    width: 150,
    justifyContent: 'center',
  },
})
