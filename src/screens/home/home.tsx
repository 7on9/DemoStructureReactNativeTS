import React from 'react'
import { View, Text } from 'react-native'
import { styles } from '../../configs/theme'

export const Home = () => {
  return (
    <View style={[styles.container, styles.center]}>
      <Text>
        Home
      </Text>
    </View>
  )
}
