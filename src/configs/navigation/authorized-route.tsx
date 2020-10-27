import React from 'react'
// import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { SCREENS_NAME } from '../../constants'
import { Home, User } from '../../screens'
import { Drawer } from '../../components'

// const Stack = createStackNavigator()
const DrawerNav = createDrawerNavigator()

// export const HomeStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name={SCREENS_NAME.Home} component={Home}/>
//       <Stack.Screen name={SCREENS_NAME.User} component={User}/>
//     </Stack.Navigator>
//   )
// }

export const AppDrawer = () => {
  return (
    <DrawerNav.Navigator
      initialRouteName={SCREENS_NAME.Home}
      drawerContent={(props) => <Drawer {...props} />}>
      <DrawerNav.Screen name={SCREENS_NAME.Home} component={Home} />
      <DrawerNav.Screen name={SCREENS_NAME.User} component={User} />
    </DrawerNav.Navigator>
  )
}
