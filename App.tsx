/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react'
import { RootNavigator } from './src/configs/navigation'
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import storeConfig from './src/redux'

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Provider store={storeConfig()}> 
        <RootNavigator />
      </Provider>
    </>
  )
}

export default App
