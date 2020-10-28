import React, { PropsWithChildren } from 'react'
import { Text, TextProps } from 'react-native'

export const AppText = (props: PropsWithChildren<TextProps>) => {
    return (
        <Text {...props} style={[{ fontFamily: 'OpenSans-Regular' }, props.style]}>
            {props.children}
        </Text>
    )
}
