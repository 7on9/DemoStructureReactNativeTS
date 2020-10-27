export interface BaseActionType {
  type: string
}

export interface LoginActionType extends BaseActionType {
  email: string
  password: string
}

export interface ErrorActionType extends BaseActionType {
  error: any
}

export interface LoginSuccessActionType extends BaseActionType {
  token: string
  user: any
}
