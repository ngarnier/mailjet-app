import { List } from 'immutable'

export const apikeys = (state = List(), action) => {
  switch (action.type) {
    case 'APIKEYS_LOAD_SUCCESS':
      return action.key
    case 'APIKEY_ADD':
      return state.push(action.key)
    case 'APIKEY_REMOVE': {
      return state.delete(action.key)
    }
    default:
      return state
  }
}
