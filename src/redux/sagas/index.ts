import { all } from 'redux-saga/effects'
import auth from './auth'
// import notification from './notificationSaga'

export default function* rootSaga() {
  yield all([auth()])
}
