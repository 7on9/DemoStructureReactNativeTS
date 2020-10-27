import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOG_OUT,
  RESET_ERROR,
  VERIFY,
} from './types'
import AsyncStorage from '@react-native-community/async-storage'
import { FILE_USER_ACCESS_TOKEN, FILE_USER_DATA } from '../../constants'
import { BaseActionType, ErrorActionType, LoginActionType, LoginSuccessActionType } from '../../@types/actions'

export const resetError = () => {
  return {
    type: RESET_ERROR,
  }
}

export const loginRequest = ({ email, password }: { email: string, password: string }): LoginActionType => {
  return {
    type: LOGIN_REQUEST,
    email,
    password,
  }
}

export const loginSuccess = ({ token, user }: { token: string, user: any }): LoginSuccessActionType => {
  return {
    type: LOGIN_SUCCESS,
    token,
    user,
  }
}

export const loginFailure = (error: any): ErrorActionType => {
  return {
    type: LOGIN_FAILED,
    error,
  }
}

export const logOut = (): BaseActionType => {
  AsyncStorage.removeItem(FILE_USER_DATA)
  AsyncStorage.removeItem(FILE_USER_ACCESS_TOKEN)
  return {
    type: LOG_OUT,
  }
}

export const verify = ({ token, user }: { token: string, user: any }): LoginSuccessActionType => {
  return {
    type: VERIFY,
    token,
    user,
  }
}
