import React from 'react'
import { Header, Button } from 'native-base'
import { View, Text, TextStyle, ViewStyle } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { APP_COLORS } from '../config/appConstants'
import { shadow } from './shadow'
import { AppIconProps, Icon } from './icon'

export interface HeaderProps {
  iconLeft?: AppIconProps
  iconRight?: AppIconProps
  title: string
  titleStyle: TextStyle
  onPressLeftButton?: () => any
  onPressRightButton?: () => any
  style: ViewStyle
}

export const AppHeader = ({
  iconLeft,
  iconRight,
  title,
  titleStyle = {},
  onPressLeftButton,
  onPressRightButton,
  style = {},
}: HeaderProps) => {
  return (
    <Header
      style={[
        style,
        shadow(10, APP_COLORS.main),
        {
          backgroundColor: APP_COLORS.main,
          height: EStyleSheet.value('56rem'),
          marginTop:
            // Platform.OS == 'ios'
            -EStyleSheet.value('12rem'),
          // : -EStyleSheet.value('15rem'),
        },
      ]}>
      <View style={styles.buttonContainer}>
        <Button
          transparent
          onPress={onPressLeftButton}
          style={{ width: '100%', height: '100%' }}>
          <Icon
            name={iconLeft?.name || 'bars'}
            fontFamily={iconLeft?.fontFamily || 'FontAwesome'}
            {...(iconLeft ? iconLeft : {})}
          />
        </Button>
      </View>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, titleStyle]}>{title || ''}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {iconRight ? (
          <Button
            transparent
            onPress={onPressRightButton}
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'flex-start',
            }}>
            <Icon
              name={iconRight?.name || 'undo-alt'}
              fontFamily={iconRight?.fontFamily || 'FontAwesome5'}
              {...(iconRight ? iconRight : {})}
            />
          </Button>
        ) : null}
      </View>
    </Header>
  )
}

const styles = EStyleSheet.create({
  icon: {
    color: '#fff',
    fontSize: '24rem',
    width: '100%',
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: '20rem',
    color: '#fff',
  },
  titleContainer: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
})
