import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
// import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { AppDrawer } from './authorized-route'
import { LoginStack } from './unauthorized-route'
import { APP_ROUTES } from '../../constants'
import { useSelector } from 'react-redux'
import { GlobalStateProps } from '../../@types/reducer'
// import { useSelector } from 'react-redux'

const Stack = createStackNavigator()
// const Drawer = createDrawerNavigator()

export const RootNavigator = () => {
  const { user, isAuthenticated } = useSelector(
    (state: GlobalStateProps) => state.auth
  )
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={APP_ROUTES.Unauthorized}>
        {user && isAuthenticated ? (
          <Stack.Screen name={APP_ROUTES.Authorized} component={AppDrawer} />
        ) : (
          <Stack.Screen name={APP_ROUTES.Unauthorized} component={LoginStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
