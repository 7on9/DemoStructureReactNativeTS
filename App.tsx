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

const LocaleProvider: FC<any> = (props) => {
  const language = useSelector((state: { appConfig: any }) => state.appConfig.language)
  const dispatch = useDispatch()
  
  const loadLocale = async () => {
    let language = await AsyncStorage.getItem(FILE_LANGUAGE)
    language = language || 'vi'
    i18n.language = language
    props.selectLanguage && props.selectLanguage(language)
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
