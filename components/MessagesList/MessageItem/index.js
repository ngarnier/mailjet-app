import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Badge } from 'native-base'

export default class MessageItem extends React.Component {
  render() {
    const { status, campaign, contact } = this.props.message

    return (
      <View>
        <View style={style.row}>
          <Text style={style.title}>{campaign.subject}</Text>
          <Text style={style.information}>From: {campaign.fromName} ({campaign.fromEmail})</Text>
          <Text style={style.information}>To: {contact.email}</Text>
          {status === 'sent' && (
            <Badge style={[style.badge, style.sent]}>
              <Text style={style.sentText}>
                {status}
              </Text>
            </Badge>
          )}
          {status === 'opened' && (
            <Badge style={[style.badge, style.opened]}>
              <Text style={style.openedText}>
                {status}
              </Text>
            </Badge>
          )}
          {status === 'clicked' && (
            <Badge style={[style.badge, style.clicked]}>
              <Text style={style.clickedText}>
                {status}
              </Text>
            </Badge>
          )}
          {status === 'blocked' && (
            <Badge style={[style.badge, style.blocked]}>
              <Text style={style.blockedText}>
                {status}
              </Text>
            </Badge>
          )}
          {status === 'bounce' && (
            <Badge style={[style.badge, style.blocked]}>
              <Text style={style.blockedText}>
                {status}
              </Text>
            </Badge>
          )}
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  row: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderBottomWidth: 1,
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  information: {
    fontSize: 14,
    paddingTop: 5,
    color: '#555',
  },
  badge: {
    marginTop: 10,
    borderRadius: 5,
  },
  sent: {
    backgroundColor: '#DEFFEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sentText: {
    color: '#2AB569',
    fontWeight: 'bold',
  },
  opened: {
    backgroundColor: '#DEFFEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  openedText: {
    color: '#2AB569',
    fontWeight: 'bold',
  },
  clicked: {
    backgroundColor: '#B0F8D3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clickedText: {
    color: '#1D7947',
    fontWeight: 'bold',
  },
  blocked: {
    backgroundColor: '#05172B',
    color: '#DCDFE4',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blockedText: {
    color: '#DCDFE4',
    fontWeight: 'bold',
  },
  bounced: {
    backgroundColor: '#FFDEDF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bouncedText: {
    color: '#B52A2A',
    fontWeight: 'bold',
  },
})

