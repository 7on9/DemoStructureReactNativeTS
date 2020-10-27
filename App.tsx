/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { FC, useEffect } from 'react'
import { RootNavigator } from './src/configs/navigation'
import { StatusBar } from 'react-native'
import { Provider, useDispatch, useSelector } from 'react-redux'
import storeConfig from './src/redux'
import { LANGUAGE_CHANGE_LANGUAGE } from './src/redux/actions/types'
import { FILE_LANGUAGE } from './src/constants'
import AsyncStorage from '@react-native-community/async-storage'
import i18n from './src/i18n'
import { GlobalStateProps } from './src/@types/reducer'

const LocaleProvider: FC<any> = (props) => {
  const { language } = useSelector((state: GlobalStateProps) => state.appConfig)
  const dispatch = useDispatch()
  
  const loadLocale = async () => {
    let _language = await AsyncStorage.getItem(FILE_LANGUAGE)
    _language = _language || 'vi'
    i18n.language = _language
    props.selectLanguage && props.selectLanguage(_language)
  }

  useEffect(() => {
    loadLocale()
  }, [])
  
  // const [language, setLocale] = useState('vi')
  useEffect(() => {
    if (props && props.language == language) {
      return
    }
    dispatch({ type: LANGUAGE_CHANGE_LANGUAGE, payload: language })
    i18n.language = language
  }, [props])

  return <RootNavigator />
}

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Provider store={storeConfig()}>
        <LocaleProvider />
      </Provider>
    </>
  )
}

export default App
