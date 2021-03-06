import React from 'react'
import PropTypes from 'prop-types'
import { Image, Linking, StyleSheet, Text, View } from 'react-native'

export default function Article({
  image, title, link, categories,
}) {
  if (categories.length > 3) {
    categories.splice(3, categories.length - 1)
  }

  return (
    <View style={style.card}>
      {image !== null && (<Image style={style.image} source={{ uri: image[1] }} />)}
      <View style={style.contentContainer}>
        <Text style={style.title} onPress={() => { Linking.openURL(link) }}>{title}</Text>
        <View style={style.categories}>
          {categories.map((category, index) => (
            <Text
              key={index.toString()}
              style={style.category}
              onPress={() => { Linking.openURL(`https://www.mailjet.com/blog/?tag=${category}`) }}
            >
              {category}
            </Text>
          ))}
        </View>
        <Text style={style.link} onPress={() => { Linking.openURL(link) }}>
          Learn more
        </Text>
      </View>
    </View>
  )
}

Article.propTypes = {
  image: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
}

Article.defaultProps = {
  image: null,
}

const style = StyleSheet.create({
  card: {
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    overflow: 'hidden',
  },
  contentContainer: {
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
  image: {
    height: 150,
  },
  link: {
    color: '#1FBE9F',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
})
