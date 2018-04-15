import React from 'react'
import { SafeAreaView, View, Text, Button, StyleSheet } from 'react-native'
import { Spinner } from 'native-base'

export default class EmptyState extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.props.state === 'no-key' && (
          <View style={styles.container}>
            <Text>No Mailjet account found</Text>
            <Button title="Add a Mailjet API key" onPress={() => this.props.navigation.navigate('Add API key')} />
          </View>
        )}
        {this.props.state === 'loading' && (
          <View style={styles.container}>
            <Spinner color="#FCAC2E" />
            <Text>Loading statistics</Text>
          </View>
        )}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
  },
});
