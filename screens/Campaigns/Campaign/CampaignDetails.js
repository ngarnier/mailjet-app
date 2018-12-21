import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { StyleSheet, ScrollView, View, Dimensions } from 'react-native'
import LabelRow from '../../../components/LabelRow'
import StatsRow from '../../../components/StatsRow'
import Preview from '../../../components/Preview'

@connect(state => ({
  previewIsFullSize: state.preview.previewIsFullSize,
}))

export default class CampaignDetails extends React.Component {
  render() {
    const {
      id,
      title,
      subject,
      fromName,
      fromEmail,
      listName,
      permalink,
      status,
      previewIsFullSize,
    } = this.props
    return (
      <ScrollView style={style.container}>
        {permalink && (
          <View style={{ height: previewIsFullSize ? Dimensions.get('window').height - 80 : Dimensions.get('window').height / 2 }}>
            <Preview permalink={permalink} />
          </View>
        )}
        <LabelRow title="CAMPAIGN NAME" subtitle={title || 'Untitled Campaign'} />
        <LabelRow title="SUBJECT" subtitle={subject || 'No subject specified'} />
        <LabelRow title="RECIPIENTS" subtitle={listName || 'No list specified'} />
        <LabelRow title="FROM" subtitle={fromEmail ? `${fromName} (${fromEmail})` : 'No sender specified'} />
        {status === 'Sent' && (
        <StatsRow
          source="Campaign"
          id={id}
        />
        )}
      </ScrollView>
    )
  }
}

CampaignDetails.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  fromName: PropTypes.string.isRequired,
  fromEmail: PropTypes.string.isRequired,
  listName: PropTypes.string,
  permalink: PropTypes.string,
  status: PropTypes.string.isRequired,
  previewIsFullSize: PropTypes.bool,
}

CampaignDetails.defaultProps = {
  listName: null,
  previewIsFullSize: false,
  permalink: undefined,
}

const style = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: '#fff',
    flex: 1,
  },
})
