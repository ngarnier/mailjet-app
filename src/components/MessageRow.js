import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'
import { Badge } from 'native-base'

export default class MessageRow extends React.PureComponent {
  render() {
    const {
      title, subtitle, status, date,
    } = this.props
    const safeStatus = status.toLowerCase()

    return (
      <View style={style.row}>
        <Text style={style.title}>{title || 'Untitled'}</Text>
        {subtitle && (<Text style={style.subtitle}>{subtitle}</Text>)}
        <View style={style.date}>
          <Badge style={[style.badge, style[safeStatus]]}>
            <Text style={style[`${safeStatus}Text`]}>
              {safeStatus}
            </Text>
          </Badge>
          {date && (<Text>on {date}</Text>)}
        </View>
      </View>
    )
  }
}

MessageRow.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.string,
}

MessageRow.defaultProps = {
  date: null,
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
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    paddingTop: 5,
    paddingBottom: 10,
    color: '#111',
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    borderRadius: 5,
    marginRight: 5,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  blockedText: {
    color: '#fff',
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

