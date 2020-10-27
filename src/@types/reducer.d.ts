export interface AuthProps {
  type: string
  isAuthenticated?: boolean
  isFetching?: boolean
  token?: string
  user?: object
  errorMessage?: string
  error: {
    error: {
      message:  string
    }
  }
  isValidToken?: boolean
  isNetworkConnected?: boolean
}

export interface AppConfigProps { 
  type: string
  isConnected?: boolean
  language?: string 
}

export interface GlobalStateProps {
  auth: AuthProps
  appConfig: AppConfigProps
}