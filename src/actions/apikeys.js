import { storeKey, getLocalKeys } from '../helpers/storage'

export const addApiKey = (name, publicKey, secretKey) => async (dispatch) => {
  let keys = await getLocalKeys()
  const key = { name, publicKey, secretKey }
  let duplicate = false
  /* eslint-disable array-callback-return */
  keys.map((k) => {
    if (k.publicKey !== publicKey) {
      duplicate = true
    } else {
      // handle the error
    }
  })
  /* eslint-enable */
  if (!duplicate) {
    keys = keys.push(key)
    await storeKey(keys)
    dispatch({
      type: 'APIKEY_ADD',
      key,
    })
  }
}

export const removeApiKey = apikey => async (dispatch) => {
  let keys = await getLocalKeys()
  const index = keys.findIndex(apikeyObj => apikeyObj.publicKey === apikey.publicKey)
  keys = keys.splice(index, 1)
  await storeKey(keys)
  dispatch({
    type: 'APIKEY_REMOVE',
    key: index,
  })
}

export const loadApiKeys = () => async (dispatch) => {
  const keys = await getLocalKeys()
  dispatch({
    type: 'APIKEYS_LOAD_SUCCESS',
    key: keys,
  })
}
