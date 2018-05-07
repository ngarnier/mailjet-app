import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, ScrollView, View } from 'react-native'
import LabelRow from '../../components/LabelRow'
import StatsRow from '../../components/StatsRow'
import Preview from '../../components/Preview'

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
}) {
  return (
    <ScrollView style={style.container}>
      {permalink && (
        <Preview permalink={permalink} />
      )}
      <LabelRow title="CAMPAIGN NAME" subtitle={title} />
      <LabelRow title="SUBJECT" subtitle={subject} />
      <LabelRow title="RECIPIENTS" subtitle={listName} />
      <LabelRow title="FROM" subtitle={`${fromName} (${fromEmail})`} />
      <View style={{ borderBottomColor: '#ddd', borderBottomWidth: 1 }} />
      <StatsRow
        delivered={delivered}
        opened={opened}
        clicked={clicked}
      />
    </ScrollView>
  )
}

CampaignDetails.propTypes = {
  title: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  fromName: PropTypes.string.isRequired,
  fromEmail: PropTypes.string.isRequired,
  listName: PropTypes.string.isRequired,
  permalink: PropTypes.string.isRequired,
  delivered: PropTypes.string.isRequired,
  opened: PropTypes.string.isRequired,
  clicked: PropTypes.string.isRequired,
}

const style = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: '#fff',
    height: '100%',
  },
})
