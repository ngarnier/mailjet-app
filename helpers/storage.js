import { AsyncStorage } from 'react-native'
import { List } from 'immutable'

export const storeKey = async (keys) => {
  try {
    const jsonKeys = JSON.stringify(keys)
    return await AsyncStorage.setItem('apikeys', jsonKeys)
  } catch (error) {
    return ('A problem occurred when trying to add this key.')
  }
}

export const removeKey = async () => {
  try {
    return await AsyncStorage.removeItem('apikeys')
  } catch (error) {
    return ('A problem occurred when trying to remove this key.')
  }
}

export const listKeys = async () => {
  try {
    return await AsyncStorage.getItem('apikeys')
  } catch (error) {
    return ('A problem occurred when retrieving your keys.')
  }
}

export const getLocalKeys = async () => {
  try {
    let keys = await AsyncStorage.getItem('apikeys')
    keys = keys === null ? [] : JSON.parse(keys)
    const parsedKeys = keys.map(e => (typeof e === 'string' ? JSON.parse(e) : e))
    return List(parsedKeys)
  } catch (error) {
    return null
  }
}
