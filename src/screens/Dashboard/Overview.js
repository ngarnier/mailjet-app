import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, View, StyleSheet } from 'react-native'
import OverviewCard from '../../components/OverviewCard'
import SubjectCard from '../../components/SubjectCard'
import StatsChart from '../../components/StatsCard'

@connect(state => ({
  apikeys: state.apikeys,
}))

export default class Overview extends React.Component {
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <View>
          <View style={style.overview}>
            <OverviewCard source="emails" navigation={this.props.navigation} />
            <OverviewCard source="contacts" navigation={this.props.navigation} />
          </View>
          <View style={style.subject}>
            <SubjectCard navigation={this.props.navigation} />
          </View>
          <View style={style.chart}>
            <StatsChart />
          </View>
        </View>
      </ScrollView>
    )
  }
}

const style = StyleSheet.create({
  overview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  subject: {
    marginTop: 0,
    paddingRight: 10,
    paddingLeft: 10,
  },
  chart: {
    marginTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
})

