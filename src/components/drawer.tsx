import { DrawerContentComponentProps } from '@react-navigation/drawer'
import React, { FC, useState } from 'react'
import { View, Text, StyleSheet, ViewProps } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { APP_COLORS, APP_SIZES, SCREENS_NAME } from '../constants'
import { Icon } from './icon'

export const Drawer: FC<DrawerContentComponentProps> = (
  props: DrawerContentComponentProps
) => {
  const [currentScreenIdx, setCurrentScreenIdx] = useState(0)
  const { navigation } = props
  const screens = [
    {
      name: 'Home',
      route: SCREENS_NAME.Home,
      leftIcon: 'home',
      rightIcon: 'angle-right',
      fontFamily: 'FontAwesome',
      subChildren: [],
    },
    {
      name: 'User',
      route: SCREENS_NAME.User,
      leftIcon: 'home',
      rightIcon: 'angle-right',
      fontFamily: 'FontAwesome',
      subChildren: [],
    },
  ]

  const ScreenItem: FC<{ item: ScreenItemProps, index: number, style?: ViewProps }> = ({ item, index, style }) => {
    // const { item, index } = data
    const bgColor = index == currentScreenIdx ? 'rgba(0, 0, 0, 0.2)' : '#f0f0f0'
    // item.route == currentScreen ? 'rgba(0, 0, 0, 0.2)' : 'transparent'
    const iconColor = index == currentScreenIdx ? '#52489C' : '#206BA4'
    // const iconColor = item.route == currentScreen ? '#003366' : '#206BA4'
    return (
      <View
        key={item.name}
        style={[
          styles.itemContainer,
          {
            backgroundColor: bgColor,
            height: APP_SIZES.heightScreen * 0.1,
            flexDirection: 'row',
          },
          style,
        ]}
        onTouchStart={() => {
          setCurrentScreenIdx(index)
          navigation.navigate(item.route)
        }}>
        <View style={{ flex: 3 }}>
          <Icon
            style={[styles.icon, { color: iconColor, fontSize: 20 }]}
            name={item.leftIcon}
            fontFamily={item.fontFamily || 'FontAwesome'}
          />
        </View>
        <View style={{ flex: 9, ...styles.textItemContainer }}>
          <Text style={styles.textItem}>{item.name}</Text>
        </View>
        <View style={{ flex: 2, alignItems: 'flex-end' }}>
          <Icon
            style={styles.icon}
            name={item.rightIcon}
            fontFamily="FontAwesome"
          />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={{ marginTop: APP_SIZES.heightScreen * 0.25 }}></View>
      <ScrollView
        style={styles.listContainer}
        contentContainerStyle={{ height: '100%' }}>
        {screens.map((item, idx) => <ScreenItem item={item} index={idx} key={idx} />)}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  profile: {
    marginTop: 10,
    paddingBottom: 10,
    // borderBottomColor: APP_COLORS.text.dark,
    borderBottomColor: APP_COLORS.text.dark,
    borderBottomWidth: 0.35,
    // backgroundColor: APP_COLORS.main,
  },
  container: {
    flex: 1,
  },
  circleAvatar: {
    width: APP_SIZES.widthScreen * 0.25,
    height: APP_SIZES.widthScreen * 0.25,
    borderWidth: 1,
    borderColor: APP_COLORS.text.dark,
    borderRadius: (APP_SIZES.widthScreen * 0.25) / 2,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    // backgroundColor: 'transparent', //'#f5f5f5',
    flex: 6,
  },
  icon: {
    color: APP_COLORS.text.dark,
    fontSize: 24,
    alignSelf: 'center',
  },
  textItemContainer: {
    justifyContent: 'center',
  },
  textItem: {
    fontSize: 20,
    color: APP_COLORS.text.dark, // '#181818', // '#fff',
  },
  itemContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // borderBottomColor: APP_COLORS.text.dark,
    // borderBottomWidth: 0.35,
    // marginLeft: 10,
    // marginRight: 10,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})

interface ScreenItemProps {
  name: string
  route: string
  leftIcon: string
  rightIcon: string
  fontFamily: string
  subChildren?: Array<ScreenItemProps>
}
