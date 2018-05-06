import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import LabelRow from '../../components/LabelRow'
import StatsRow from '../../components/StatsRow'
import Preview from '../../components/Preview'

export default class Campaign extends React.Component {
  render() {
    const {
      title,
      Subject,
      FromName,
      FromEmail,
      ListName,
      Permalink,
      delivered,
      opened,
      clicked } = this.props.campaignDetails

    return (
      <ScrollView style={style.container}>
        {Permalink && (
          <Preview permalink={Permalink} />
        )}
        <LabelRow title="CAMPAIGN NAME" subtitle={title} />
        <LabelRow title="SUBJECT" subtitle={Subject} />
        <LabelRow title="RECIPIENTS" subtitle={ListName} />
        <LabelRow title="FROM" subtitle={`${FromName} (${FromEmail})`} />
        <StatsRow
          delivered={delivered}
          opened={opened}
          clicked={clicked}
        />
      </ScrollView>
    )
  }
}

const style = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: '#fff',
    height: '100%',
  }
})
