import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { SwipeRow, Button, Icon } from 'native-base'
import { getKeyDetails, deleteKey } from '../../helpers/apikey'

export default class StatsItem extends React.Component {
  state = {
    name: 'API Key name',
    secretKey: '********************************',
  }

  showSecret = async (publicKey) => {
    const { secretKey } = await getKeyDetails(publicKey)

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

  handleDelete = async (publicKey) => {
    await deleteKey(publicKey)
  }

  async componentDidMount() {
    const { publicKey } = this.props
    const { name } = await getKeyDetails(publicKey)

    this.setState({
      name,
    })
  }

  render() {
    const { publicKey } = this.props

    const { secretIsVisible, name, secretKey } = this.state

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
          <Button danger onPress={() => this.handleDelete(publicKey)}>
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
