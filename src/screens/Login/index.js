import React from 'react';
import { View, StyleSheet } from 'react-native'
import { Container, Content, Thumbnail, Form, Item, Label, Input, Button, Text, Spinner } from 'native-base'
import { connect } from 'react-redux'
import { checkAuth, getMailjetKeys } from '../../helpers/mailjet'
import { addApiKey } from '../../actions/apikeys'
import commonColor from '../../native-base-theme/variables/commonColor'

@connect(
  null,
  {
    addApiKey
  },
)

export default class Login extends React.Component {
  state = {
    publicKey: '',
    secretKey: '',
    publicBorder: commonColor.textColor,
    secretBorder: commonColor.textColor,
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
      const { name } = await getMailjetKeys(publicKey, secretKey)
      this.props.addApiKey(name, publicKey, secretKey)

      this.setState({
        publicKey: '',
        secretKey: '',
      })
    }
  }

  render() {
    const { publicKey, secretKey, invalidKeys, isLoading, publicBorder, secretBorder } = this.state

    return (
      <Container>
        <Content contentContainerStyle={style.container}>
          <Thumbnail
            large
            style={style.thumbnail}
            source={require('../../img/round-logo.png')}
          />
          <Form style={{ width: '100%' }}>
            <Item style={{ borderColor: publicBorder }} floatingLabel>
              <Label style={{ color: publicBorder }}>Public key</Label>
              <Input
                autofocus
                onBlur={() => { this.setState({ publicBorder: commonColor.textColor }) }}
                onFocus={() => { this.setState({ publicBorder: commonColor.brandPrimary }) }}
                onChangeText={publicKey => this.handlePublicInput(publicKey)}
                clearButtonMode={'while-editing'}
              />
            </Item>
            <Item style={{ borderColor: secretBorder }} floatingLabel>
              <Label style={{ color: secretBorder }}>Secret key</Label>
              <Input
                onBlur={() => { this.setState({ secretBorder: commonColor.textColor }) }}
                onFocus={() => { this.setState({ secretBorder: commonColor.brandPrimary }) }}
                onChangeText={secretKey => this.handleSecretInput(secretKey)}
                clearButtonMode={'while-editing'}
              />
            </Item>
          </Form>
          <View style={style.warning}>
            {invalidKeys && (
              <Text style={style.warningText}>Failed to login, please check API keys</Text>
            )}
          </View>
          <View>
            <Button
              disabled={!publicKey || !secretKey}
              style={style.button}
              onPress={() => this.handleSave()}
            >
              {isLoading && (<Spinner size="small" color="white" />)}
              {!isLoading && (<Text>Login</Text>)}
            </Button>

          </View>
        </Content>
      </Container>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
  },
  warning: {
    height: 40,
    width: '100%',
  },
  warningText: {
    margin: 10,
    justifyContent: 'flex-start',
    fontSize: 14,
    color: 'red',
  },
  button: {
    width: 150,
    justifyContent: 'center',
  },
})
