import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Linking } from 'react-native'

export default function Article({
  title, link, categories,
}) {
  return (
    <View style={style.card}>
      <Text style={style.title}>{title}</Text>
      <View style={style.categories}>
        {categories.map((category, index) => (
          <Text key={index.toString()} style={style.category}>{category}</Text>
        ))}
      </View>
      <Text style={style.link} onPress={() => { Linking.openURL(link) }}>
        Learn more
      </Text>
    </View>
  )
}

Article.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
}

const style = StyleSheet.create({
  card: {
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    paddingTop: 10,
    paddingRight: 15,
    paddingBottom: 10,
    paddingLeft: 15,
  },
  categories: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    maxWidth: '100%',
    paddingTop: 10,
    paddingBottom: 5,
  },
  category: {
    borderRadius: 5,
    backgroundColor: '#eee',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 5,
    marginBottom: 5,
    fontSize: 15,
    color: '#777',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  link: {
    color: '#1FBE9F',
    fontSize: 16,
    fontWeight: '600',
  },
})
