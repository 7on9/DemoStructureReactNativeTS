import {
  NETWORK_CHANGE_STATE,
  LANGUAGE_CHANGE_LANGUAGE,
  LANGUAGE_TOGGLE_LANGUAGE,
} from '../actions/types'

const initialState = {
  isConnected: true,
  language: 'vi',
}

export default (state = initialState, action: { type: string, isConnected?: boolean, language: string }) => {
  switch (action.type) {
    case NETWORK_CHANGE_STATE: {
      return Object.assign({}, state, { isConnected: action.isConnected })
    }
    case LANGUAGE_CHANGE_LANGUAGE: {
      return Object.assign({}, state, { language: action.language })
    }
    case LANGUAGE_TOGGLE_LANGUAGE: {
      const newState = state.language == 'vi' ? 'en' : 'vi'
      return Object.assign({}, state, { language: newState })
    }
  }
  return state
}
