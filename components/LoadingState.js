import React from 'react'
import PropTypes from 'prop-types'
import { Animated, View, StyleSheet } from 'react-native'

export default class LoadingState extends React.Component {
  static propTypes = {
    type: PropTypes.string,
  }

  static defaultProps = {
    type: undefined,
  }

  state = {
    fadeAnim: new Animated.Value(0.5),
  }

  componentDidMount() {
    Animated.loop(Animated.sequence([
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 500,
      }),
      Animated.timing(this.state.fadeAnim, {
        toValue: 0.5,
        duration: 500,
        delay: 500,
      }),
    ])).start()
  }

  render() {
    const { type } = this.props

    return (
      <View>
        {[0, 1, 2, 3, 4, 5, 6].map(e => (
          <View style={style.row} key={e}>
            <Animated.View style={[style.line, style.title, { opacity: this.state.fadeAnim }]} />
            <Animated.View style={[style.line, style.subtitle, { opacity: this.state.fadeAnim }]} />
            {type === 'campaigns' && (
              <View style={style.dateRow}>
                <Animated.View
                  style={[style.line, style.badge, { opacity: this.state.fadeAnim }]}
                />
                <Animated.View
                  style={[style.line, style.dateText, { opacity: this.state.fadeAnim }]}
                />
              </View>
            )}
          </View>
        ))}
      </View>
    )
  }
}

const style = StyleSheet.create({
  row: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderBottomWidth: 1,
    padding: 20,
  },
  line: {
    height: 12,
    borderRadius: 100,
    marginBottom: 10,
  },
  title: {
    width: 100,
    backgroundColor: '#aaa',
  },
  subtitle: {
    width: 150,
    backgroundColor: '#ccc',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    height: 20,
    width: 50,
    borderRadius: 5,
    marginRight: 5,
    backgroundColor: '#ccc',
  },
  dateText: {
    height: 10,
    width: 200,
    backgroundColor: '#ddd',
  },
})
