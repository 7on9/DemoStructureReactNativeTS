import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { SCREENS_NAME } from '../../constants'
import { Login } from '../../screens'

const Stack = createStackNavigator()

export const LoginStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={SCREENS_NAME.Login} component={Login} />
    </Stack.Navigator>
  )
}
