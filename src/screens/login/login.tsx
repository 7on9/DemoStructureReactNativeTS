import { StackActions, useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, Button } from 'react-native'
import { styles } from '../../configs/theme'
import { APP_ROUTES } from '../../constants'

export const Login = () => {
  const navigation = useNavigation()
  return (
    <View style={[styles.container, styles.center]}>
      <Text>Login screen</Text>
      <Button
        onPress={() =>
          navigation.dispatch(StackActions.replace(APP_ROUTES.Authorized))
        }
        title="Login"
      />
    </View>
  )
}
