import { StyleSheet } from "react-native"
import { APP_HW_RATIO } from "../../constants"
export const appBorderRadius = APP_HW_RATIO * 0.5

export const APP_FONT_SIZES = {
  ssmall: APP_HW_RATIO * 0.75,
  small: APP_HW_RATIO,
  normal: APP_HW_RATIO * 1.25,
  header: APP_HW_RATIO * 1.5,
  large: APP_HW_RATIO * 2,
  xLarge: APP_HW_RATIO * 4,
  xxLarge: APP_HW_RATIO * 6,
}

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  // your styles here
})

export const APP_COLORS = {
  main: '#17a51e',
  red: '#d03542',
  blue: '#2a68c7',
  yellow: '#d0a036',
  green: '#498c2b',
  text: {
    header: '#37393A',
    dark: '#454F63',
    normal: '#78849E',
  },
  background: '#F7F7FA',
}