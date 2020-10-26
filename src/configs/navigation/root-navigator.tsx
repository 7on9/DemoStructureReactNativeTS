import React from 'react'
// import { createStackNavigator } from '@react-navigation/stack'
// import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { AppDrawer } from './authorized-route'
// import { useSelector } from 'react-redux'

// const Stack = createStackNavigator()
// const Drawer = createDrawerNavigator()

export const RootNavigator = () => {
  // const user = useSelector(state => state)
  return (
    <NavigationContainer>
      <AppDrawer />
    </NavigationContainer>
  )
}