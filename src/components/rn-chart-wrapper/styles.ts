import { APP_COLORS } from '../../config/appConstants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    headerContainer: {
        flex: 1.25,
        width: '75%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    headerText: {
        marginLeft: 12,
        marginRight: 12,
        color: APP_COLORS.text.dark,
        fontSize: 0.06,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: 'OpenSans-Bold',
        backgroundColor: 'transparent',
    },
})
