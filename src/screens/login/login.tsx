import React from 'react'
import { View, Text, Button } from 'react-native'
import { useDispatch } from 'react-redux'
import { styles } from '../../configs/theme'
import { loginSuccess } from '../../redux/actions/auth'

export const Login = () => {
  const dispatch = useDispatch()
  return (
    <View style={[styles.container, styles.center]}>
      <Text>Login screen</Text>
      <Button
        onPress={
          () =>
            dispatch(loginSuccess({ token: '123', user: { username: '7on9' } }))
          // navigation.dispatch(StackActions.replace(APP_ROUTES.Authorized))
          // navigation.dispatch(StackActions.replace(APP_ROUTES.Authorized))
        }
        title="Login"
      />
    </View>
  )
}
