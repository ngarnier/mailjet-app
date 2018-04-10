import { AsyncStorage } from 'react-native'


export const storeKey = async ({ name, publicKey, secretKey }) => {
  try {
    return await AsyncStorage.setItem(publicKey, JSON.stringify({ name, secretKey }))
  } catch (error) {
    alert('A problem occurred when trying to add this key.')
  }
}

export const getKeyDetails = async (publicKey) => {
  try {
    const details = await AsyncStorage.getItem(publicKey)
    return JSON.parse(details)
  } catch (error) {
    alert('A problem occurred when trying to fetch this key.')
  }
}

export const listKeys = async () => {
  try {
    return await AsyncStorage.getAllKeys()
  } catch (error) {
    alert('A problem occurred when retrieving your keys.')
  }
}

export const deleteKey = async (publicKey) => {
  try {
    await AsyncStorage.removeItem(publicKey)
  } catch (error) {
    alert('A problem occurred when trying to delete this key.')
  }
}
