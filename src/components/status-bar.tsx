import React from 'react'
import { StatusBar, StatusBarProps } from 'react-native'
import { APP_COLORS } from '../config/appConstants'

export const AppStatusBar = (props: StatusBarProps) => {
    return <StatusBar backgroundColor={APP_COLORS.main} barStyle="light-content" {...props} />
}
