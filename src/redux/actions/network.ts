import { NETWORK_CHANGE_STATE } from './types'

export const changeNetworkState = (isConnected: boolean) => ({
  type: NETWORK_CHANGE_STATE,
  isConnected,
})
