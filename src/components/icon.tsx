import React, { useMemo } from 'react'
import { IconProps } from 'react-native-vector-icons/Icon'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Foundation from 'react-native-vector-icons/Foundation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import Zocial from 'react-native-vector-icons/Zocial'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

export interface AppIconProps extends IconProps {
  fontFamily:
    | string
    | 'AntDesign'
    | 'Entypo'
    | 'EvilIcons'
    | 'Feather'
    | 'FontAwesome'
    | 'FontAwesome5'
    | 'Fontisto'
    | 'Foundation'
    | 'Ionicons'
    | 'MaterialIcons'
    | 'MaterialCommunityIcons'
    | 'Octicons'
    | 'Zocial'
    | 'SimpleLineIcons'
}

export const Icon = (props: AppIconProps) => {
  const RNIcon = useMemo(() => {
    switch (props.fontFamily) {
      case 'AntDesign':
        return <AntDesign {...props} />
      case 'Entypo':
        return <Entypo {...props} />
      case 'EvilIcons':
        return <EvilIcons {...props} />
      case 'Feather':
        return <Feather {...props} />
      case 'FontAwesome':
        return <FontAwesome {...props} />
      case 'FontAwesome5':
        return <FontAwesome5 {...props} />
      case 'Fontisto':
        return <Fontisto {...props} />
      case 'Foundation':
        return <Foundation {...props} />
      case 'Ionicons':
        return <Ionicons {...props} />
      case 'MaterialIcons':
        return <MaterialIcons {...props} />
      case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons {...props} />
      case 'Octicons':
        return <Octicons {...props} />
      case 'Zocial':
        return <Zocial {...props} />
      case 'SimpleLineIcons':
        return <SimpleLineIcons {...props} />
      default:
        return <FontAwesome {...props} />
    }
  }, [props])
  return RNIcon
}
