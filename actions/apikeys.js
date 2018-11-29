import { storeKey, removeKey, getLocalKeys } from '../helpers/storage'

export const addApiKey = (name, id, publicKey, secretKey) => async (dispatch) => {
  let keys = await getLocalKeys()
  const key = {
    name, id, publicKey, secretKey,
  }
  let duplicate = false
  /* eslint-disable array-callback-return */
  keys.map((k) => {
    if (k.publicKey === publicKey) {
      duplicate = true
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

export const removeApiKey = () => async (dispatch) => {
  await removeKey()
  dispatch({
    type: 'APIKEY_REMOVE',
    key: 0,
  })
}

export const loadApiKeys = () => async (dispatch) => {
  const keys = await getLocalKeys()
  dispatch({
    type: 'APIKEYS_LOAD_SUCCESS',
    key: keys,
  })
}
