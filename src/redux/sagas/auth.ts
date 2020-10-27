import AsyncStorage from '@react-native-community/async-storage'
import { take, put, call, fork } from 'redux-saga/effects'
import { LOGIN_REQUEST } from '../actions/types'
import * as loginActions from '../actions/auth'
import { dataProvider } from '../../services/dataProvider'
// import { errorMessage } from '../../utils/error'
import { FILE_USER_ACCESS_TOKEN, FILE_USER_DATA } from '../../constants'

interface DoLoginParams {
  email: string
  password: string
}
const doLogin = async ({ email, password }: DoLoginParams): Promise<{ data?: any, error?: any }> => {
  try {
    const response = await dataProvider('/User/login', {
      method: 'POST',
      data: {
        email,
        password,
      },
    })
    return response
  } catch (error) {
    return {
      error
    }
  }
}

const saveUserInfo = async (data: any) => {
  await AsyncStorage.setItem(FILE_USER_ACCESS_TOKEN, data.token)
  await AsyncStorage.setItem(FILE_USER_DATA, JSON.stringify(data))
}

function* watchLoginRequest() {
  while (true) {
    const { email, password } = yield take(LOGIN_REQUEST)
    try {
      const payload = { email, password }
      const { data, error } = yield call(doLogin, payload)
      if (!error) {
        yield call(saveUserInfo, data)
        yield put(
          loginActions.loginSuccess({
            token: data.token,
            user: data.info,
          })
        )
      } else {
        yield put(loginActions.loginFailure({ error }))
        console.log('========================================')
        console.log('[AUTH_ERROR]', error)
        console.log('========================================')
      }
    } catch (error) {
      console.log('========================================')
      console.log('[AUTH_ERROR]', error)
      console.log('========================================')
    }
  }
}

export default function* authSaga() {
  yield fork(watchLoginRequest)
}
