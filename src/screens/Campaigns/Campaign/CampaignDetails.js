import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, ScrollView } from 'react-native'
import LabelRow from '../../../components/LabelRow'
import StatsRow from '../../../components/StatsRow'
import Preview from '../../../components/Preview'

export default function CampaignDetails({
  title,
  subject,
  fromName,
  fromEmail,
  listName,
  permalink,
  delivered,
  opened,
  clicked,
  status,
}) {
  return (
    <ScrollView style={style.container}>
      {permalink && (
        <Preview permalink={permalink} />
      )}
      <LabelRow title="CAMPAIGN NAME" subtitle={title || 'Untitled Campaign'} />
      <LabelRow title="SUBJECT" subtitle={subject || 'No subject specified'} />
      <LabelRow title="RECIPIENTS" subtitle={listName || 'No list specified'} />
      <LabelRow title="FROM" subtitle={fromEmail ? `${fromName} (${fromEmail})` : 'No sender specified'} />
      {status === 'Sent' && (
      <StatsRow
        sent={delivered}
        opened={opened}
        clicked={clicked}
      />
      )}
    </ScrollView>
  )
}

CampaignDetails.propTypes = {
  title: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  fromName: PropTypes.string.isRequired,
  fromEmail: PropTypes.string.isRequired,
  listName: PropTypes.string,
  permalink: PropTypes.string.isRequired,
  delivered: PropTypes.number.isRequired,
  opened: PropTypes.string.isRequired,
  clicked: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
}

CampaignDetails.defaultProps = {
  listName: null,
}

const style = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: '#fff',
    height: '100%',
  },
})
