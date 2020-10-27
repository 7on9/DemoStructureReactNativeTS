import { combineReducers } from 'redux'

// import searchReducer from './searchReducer'
import appConfig from './config'
import auth from './auth'
// import chat from './chatReducer'
// import notification from './notification'

export default combineReducers({
  // search: searchReducer,
  appConfig,
  auth,
  // notification,
})
