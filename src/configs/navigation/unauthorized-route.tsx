import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { SCREENS_NAME } from '../../constants'
import { Home, User } from '../../screens'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()


export const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={SCREENS_NAME.Home} component={Home}/>
      <Stack.Screen name={SCREENS_NAME.User} component={User}/>
    </Stack.Navigator>
  )
}
