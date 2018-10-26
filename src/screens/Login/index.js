import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { Container, Content, Thumbnail, Form, Item, Label, Input, Button, Text, ActivityIndicator } from 'native-base'
import { connect } from 'react-redux'
import { checkAuth, getMailjetKeys } from '../../helpers/mailjet'
import { addApiKey } from '../../actions/apikeys'
import commonColor from '../../native-base-theme/variables/commonColor'
import logo from '../../img/round-logo.png'

@connect(
  null,
  {
    addApiKey,
  },
)

export default class Login extends React.Component {
  static propTypes = {
    addApiKey: PropTypes.func.isRequired,
  }

  state = {
    publicKey: '',
    secretKey: '',
    publicBorder: commonColor.textColor,
    secretBorder: commonColor.textColor,
  }

  handlePublicInput = (publicKey) => {
    this.setState({
      failureMessage: null,
      publicKey,
    })
  }

  handleSecretInput = (secretKey) => {
    this.setState({
      failureMessage: null,
      secretKey,
    })
  }

  handleSave = async () => {
    let { publicKey, secretKey } = this.state
    publicKey = publicKey.trim()
    secretKey = secretKey.trim()

    this.setState({
      isLoading: true,
    })

    const auth = await checkAuth(publicKey, secretKey)
    if (auth === 'The request timed out') {
      this.setState({
        failureMessage: 'connectivity issues, please check your network.',
        isLoading: false,
      })
    } else if (typeof auth === 'string') {
      this.setState({
        failureMessage: 'invalid credentials, please check your API keys.',
        isLoading: false,
      })
    } else {
      const { name } = await getMailjetKeys(publicKey, secretKey)
      this.props.addApiKey(name, publicKey, secretKey)
    }
  }

  render() {
    const {
      publicKey, secretKey, failureMessage, isLoading, publicBorder, secretBorder,
    } = this.state

    return (
      <Container>
        <Content contentContainerStyle={style.container}>
          <Thumbnail
            large
            style={style.thumbnail}
            source={logo}
          />
          <Form style={{ width: '100%' }}>
            <Item style={{ borderColor: publicBorder }} floatingLabel>
              <Label style={{ color: publicBorder }}>Public key</Label>
              <Input
                autofocus
                onBlur={() => { this.setState({ publicBorder: commonColor.textColor }) }}
                onFocus={() => { this.setState({ publicBorder: commonColor.brandPrimary }) }}
                onChangeText={input => this.handlePublicInput(input)}
                clearButtonMode="while-editing"
              />
            </Item>
            <Item style={{ borderColor: secretBorder }} floatingLabel>
              <Label style={{ color: secretBorder }}>Secret key</Label>
              <Input
                onBlur={() => { this.setState({ secretBorder: commonColor.textColor }) }}
                onFocus={() => { this.setState({ secretBorder: commonColor.brandPrimary }) }}
                onChangeText={input => this.handleSecretInput(input)}
                clearButtonMode="while-editing"
              />
            </Item>
          </Form>
          <View style={style.warning}>
            {failureMessage && (
              <Text style={style.warningText}>Failed to login because of {failureMessage}</Text>
            )}
          </View>
          <View>
            <Button
              disabled={!publicKey || !secretKey}
              style={style.button}
              onPress={() => this.handleSave()}
            >
              {isLoading && (<ActivityIndicator />)}
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
    backgroundColor: '#fefefe',
  },
  warning: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    paddingLeft: 18,
    paddingRight: 18,
  },
  warningText: {
    fontSize: 14,
    color: 'red',
  },
  button: {
    width: 150,
    justifyContent: 'center',
  },
})
