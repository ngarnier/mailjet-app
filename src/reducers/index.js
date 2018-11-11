import { combineReducers } from 'redux'

import apikeys from './apikeys'
import modals from './modals'
import filters from './filters'
import preview from './preview'

export default combineReducers({
  apikeys, modals, filters, preview,
})
