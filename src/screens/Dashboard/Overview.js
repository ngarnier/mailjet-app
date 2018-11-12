import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import OverviewCard from '../../components/OverviewCard'
import SubjectCard from '../../components/SubjectCard'

export default function Explore() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        <View style={style.overview}>
          <OverviewCard source="emails" />
          <OverviewCard source="contacts" />
        </View>
        <View style={style.subject}>
          <SubjectCard />
        </View>
      </View>
    </ScrollView>
  )
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
})

