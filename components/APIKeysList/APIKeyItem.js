import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux';
import { SwipeRow, Button, Icon } from 'native-base'
import { removeApiKey } from '../../actions/apikeys';

@connect(
  state => ({
    apikeys: state.apikeys
  }),
  {
    removeApiKey
  }
)

export default class ApiKeyItem extends React.Component {
  state = {
    secretKey: '********************************',
  }

  showSecret = async () => {
    const { secretKey } = this.props.apikey
    this.setState({
      secretKey,
      secretIsVisible: true,
    })
  }

  hideSecret = () => {
    this.setState({
      secretKey: '********************************',
      secretIsVisible: false,
    })
  }

  handleDelete = async (apikey) => {
    this.props.removeApiKey(apikey)
  }

  render() {
    const { name, publicKey } = this.props.apikey
    const { secretIsVisible, secretKey } = this.state

    return (
      <SwipeRow
        body={
          <View style={style.row}>
            <Text style={style.title}>{name}</Text>
            <Text style={style.label}>Public Key:</Text>
            <View style={style.key}>
              <Text style={style.label}>{publicKey}</Text>
            </View>
            <Text style={style.label}>Secret Key:</Text>
            <View style={style.key}>
              <Text style={style.label}>
                {secretKey}
              </Text>
              <Icon
                style={{ fontSize: 20, marginRight: 5 }}
                name={secretIsVisible ? 'md-eye-off' : 'md-eye'}
                onPress={secretIsVisible ?
                  () => this.hideSecret() :
                  () => this.showSecret(publicKey)}
              />
            </View>
          </View>
        }
        disableRightSwipe
        rightOpenValue={-110}
        right={
          <Button danger onPress={() => this.handleDelete(this.props.apikey)}>
            <Icon active name="md-trash" />
          </Button>
        }
      />
    );
  }
}

const style = StyleSheet.create({
  row: {
    backgroundColor: '#fff',
    width: '100%',
    paddingLeft: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    lineHeight: 24,
  },
  key: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#f3f3f3',
    padding: 5,
  },
})
