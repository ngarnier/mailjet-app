import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Badge, Text } from 'native-base'

export default class CampaignItem extends React.Component {
  render() {
    const { campaign } = this.props

    return (
      <View>
        <View style={style.row}>
          <Text style={style.title}>{campaign.title || 'Untitled'}</Text>
          <Text style={style.subject}>
            {campaign.subject} by {campaign.senderName || 'Undefined Sender Name'} ({campaign.senderEmail || 'Undefined Sender Address'})
          </Text>
          {campaign.status === 'Draft' && (
            <Badge style={[style.badge, style.draft]}>
              <Text style={style.draftText}>
                {campaign.status}
              </Text>
            </Badge>
          )}
          {campaign.status === 'Sent' && (
            <Badge style={[style.badge, style.sent]}>
              <Text style={style.sentText}>
                {campaign.status}
              </Text>
            </Badge>
          )}
          {campaign.status === 'Scheduled' && (
            <Badge style={[style.badge, style.scheduled]}>
              <Text style={style.scheduledText}>
                {campaign.status}
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
  subject: {
    fontSize: 14,
    paddingTop: 5,
    paddingBottom: 10,
    color: '#555',
  },
  badge: {
    borderRadius: 5,
  },
  draft: {
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  draftText: {
    color: '#444',
    fontWeight: 'bold',
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
  scheduled: {
    backgroundColor: '#56A1F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scheduledText: {
    color: '#407BBA',
    fontWeight: 'bold',
  }
})

