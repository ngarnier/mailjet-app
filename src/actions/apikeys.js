import { storeKey, getLocalKeys } from '../helpers/storage'

export const addApiKey = (name, publicKey, secretKey) => {
  return async (dispatch) => {
    let keys = await getLocalKeys()
    const key = { name, publicKey, secretKey }
    let duplicate = false
    keys.map((key) => {
      if (key.publicKey !== publicKey) {
        duplicate = true
      }
    })
    if (!duplicate) {
      keys = keys.push(key)
      await storeKey(keys)
      dispatch({
        type: 'APIKEY_ADD',
        key,
      })
    } else {
      // dispatch()
    }
  }
}

export const removeApiKey = (apikey) => {
  return async (dispatch) => {
    let keys = await getLocalKeys()
    const index = keys.findIndex(apikeyObj => apikeyObj.publicKey === apikey.publicKey)
    keys = keys.splice(index, 1)
    await storeKey(keys)
    dispatch({
      type: 'APIKEY_REMOVE',
      key: index,
    })
  }
}

export const loadApiKeys = () => {
  return async (dispatch) => {
    const keys = await getLocalKeys()
    dispatch({
      type: 'APIKEYS_LOAD_SUCCESS',
      key: keys,
    })
  }
}
