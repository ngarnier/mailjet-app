import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Form, Item, Label, Input } from 'native-base'
import { connect } from 'react-redux'
import { checkAuth, getMailjetKeys } from '../../helpers/mailjet'
import { addApiKey } from '../../actions/apikeys'
import commonColor from '../../native-base-theme/variables/commonColor'
import logo from '../../img/jet.png'

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
      const { name, id } = await getMailjetKeys(publicKey, secretKey)

      this.props.addApiKey(name, id, publicKey, secretKey)
    }
  }

  render() {
    const {
      failureMessage, isLoading, publicBorder, secretBorder,
    } = this.state

    return (
      <View style={style.container}>
        <View style={style.logoContainer}>
          <Image
            style={style.logo}
            /* eslint-disable global-require */
            source={logo}
            /* eslint-enable */
          />
        </View>
        <View style={style.titleView}>
          <Text style={style.title}>Welcome,</Text>
          <Text style={style.subtitle}>Please sign in with your API Keys</Text>
        </View>
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
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.handleSave()}
          style={style.button}
        >
          {isLoading && (<ActivityIndicator style={style.buttonText} color="#fff" />)}
          {!isLoading && (<Text style={style.buttonText}>Login</Text>)}
        </TouchableOpacity>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fefefe',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'System',
    marginLeft: 15,
    color: '#333',
  },
  subtitle: {
    fontSize: 22,
    fontFamily: 'System',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
    color: '#777',
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
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#FD9D29',
    height: 52,
    borderRadius: 2,
    width: '80%',
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 22,
    fontFamily: 'System',
    color: '#fff',
  },
})
