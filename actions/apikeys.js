import { storeKey, getLocalKeys } from '../helpers/storage'


export const addApiKey = (name, publicKey, secretKey) => {
  return async (dispatch) => {
    let keys = await getLocalKeys()
    const key = { name, publicKey, secretKey }
    keys = keys.push(key)
    await storeKey(keys)
    dispatch({
      type: 'APIKEY_ADD',
      key,
    })
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
