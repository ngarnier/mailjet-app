import { combineReducers } from 'redux'

import apikeys from './apikeys'
import modals from './modals'
import filters from './filters'

export default combineReducers({ apikeys, modals, filters })
