import EStyleSheet from 'react-native-extended-stylesheet'
import { Platform } from 'react-native'
export const nxpStyles = EStyleSheet.create({
    cardContainer: {
        backgroundColor: '$bgBaseColor',
    },
    headerTitle: {
        textTransform: 'uppercase',
        fontSize: '$baseTitleFontSize',
        fontWeight: '400',
    },
    smIcon: {
        width: '$smallIconSize',
        height: '$smallIconSize',
        margin: '$smallMargin',
    },
    smLabel: {
        fontSize: '$baseContentSize13',
        color: '$baseTextColorLight',
        padding: '$basePadding',
    },
    card: {
        marginLeft: '$baseMarginView',
        marginRight: '$baseMarginView',
        marginTop: '$baseMarginView',
        marginBottom: 2,
        borderRadius: '$baseBorderRadius',
        borderColor: 'transparent',
        borderWidth: 0,
        shadowRadius: '16rem',
        shadowOpacity: 0.34,
        shadowColor: 'gray',
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
            },
            android: {
                shadowOpacity: 0.2,
                elevation: 2,
            },
        }),
    },
    cardWithMarginBottom: {
        marginBottom: '$baseMarginView',
    },
    cardHeader: {
        paddingLeft: '12rem',
        paddingRight: '12rem',
        paddingTop: '12rem',
        paddingBottom: '12rem',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '$baseBorderColor',
    },
    cardFooter: {
        padding: '12rem',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardHeaderText: {
        fontSize: '18rem',
        fontWeight: '600',
        color: '$baseTextColorDark',
        paddingLeft: '6rem',
    },
    cardHeaderIcon: {
        fontSize: '18rem',
        color: '$baseTextColorDark',
        paddingLeft: '6rem',
        paddingRight: '6rem',
    },
    cardBody: {
        padding: '12rem',
    },
    cardListItem: {
        paddingTop: '12rem',
        paddingBottom: '12rem',
        borderBottomWidth: 0,
        borderTopWidth: 1,
        borderColor: '$baseBorderColor',
    },
    cardListFirstItem: {
        paddingTop: '12rem',
        paddingBottom: '12rem',
        borderBottomWidth: 0,
    },
    cardCheckBox: {
        color: '$primaryColor',
    },
    cardFirstItem: {
        borderTopLeftRadius: '$baseBorderRadius',
        borderTopRightRadius: '$baseBorderRadius',
    },
    cardLastItem: {
        borderBottomLeftRadius: '$baseBorderRadius',
        borderBottomRightRadius: '$baseBorderRadius',
    },
    cardItemStack: {
        alignItems: 'flex-start',
        borderColor: '#f4f4f6',
        marginRight: '$baseBorderRadius',
    },
    cardHorizontalItemStack: {
        alignItems: 'flex-start',
        paddingLeft: '12rem',
        paddingRight: '12rem',
        paddingTop: '6rem',
        paddingBottom: '6rem',
        flex: 1,
    },
    cardItemStackLast: {
        alignItems: 'flex-start',
        borderBottomWidth: 0,
    },
    cardItemLabel: {
        fontSize: '11rem',
        color: '$baseTextColorLight',
        marginTop: 0,
        marginBottom: 0,
    },
    cardItemText: {
        marginTop: '12rem',
        fontWeight: '600',
        fontSize: '16rem',
        color: '$baseTextColorDark',
    },
    cardText: {
        marginTop: '6rem',
        fontWeight: '600',
        fontSize: '16rem',
        color: '$baseTextColorDark',
    },
    cardHorizontalContent: {
        paddingLeft: '$baseMarginView',
        paddingRight: '$baseMarginView',
        paddingTop: '$basePadding',
        paddingBottom: '$basePadding',
        flexDirection: 'row',
        alignItems: 'center',
    },
    borderBottom: {
        borderBottomColor: '#f4f4f6',
        borderBottomWidth: 1,
    },
    noBorderItem: {
        borderBottomColor: 'transparent',
        borderBottomWidth: 0,
    },
    altBorderBottom: {
        borderBottomColor: '$altBorderColor',
        borderBottomWidth: 1,
    },
    altView: {
        backgroundColor: '$altBackground',
    },
    spaceBottom: {
        marginBottom: '$baseMarginView',
    },
    alt: {
        backgroundColor: '$altSecondaryBackground',
        borderColor: 'transparent',
    },
    altLabel: {
        color: '$altSecondaryTextColor',
    },
    altText: {
        color: '$altTextColor',
    },
    vertForm: {
        paddingBottom: '12rem',
        paddingTop: '12rem',
        paddingLeft: '$basePadding',
        paddingRight: '$basePadding',
    },
    vertFormRow: {
        flexDirection: 'row',
        padding: '$basePadding',
    },
    vertFormLabel: {
        width: '100rem',
        fontSize: '14rem',
    },
    vertFormText: {
        fontSize: '14rem',
        fontWeight: '600',
    },
    actionButton: {
        height: '$baseButtonHeight',
        alignSelf: 'stretch',
        margin: '$baseMarginView',
        marginTop: '$baseMarginView',
        borderRadius: '$baseBorderRadius',
        ...Platform.select({
            ios: {},
            android: {
                shadowOpacity: 0.3,
                elevation: 2,
            },
        }),
    },
    action: {
        color: '$primaryColor',
    },
    noMarginTop: {
        marginTop: 0,
    },
    secondaryButton: {
        backgroundColor: '$altSecondaryBackground',
    },
    buttonIcon: {
        fontSize: '18rem',
        marginRight: '$baseMarginView',
    },
    buttonText: {
        fontFamily: '$fontRotobo',
        fontSize: '$baseButtonTextSize',
        textTransform: 'uppercase',
        color: 'white',
        alignSelf: 'center',
    },

    // input
    inputLeftIcon: {
        paddingLeft: '16rem',
        paddingRight: '6rem',
        marginRight: '8rem',
        // borderRightWidth: 0.5,
        borderRightColor: '$baseBorderColor',
        fontSize: '20rem',
        color: 'gray',
        alignSelf: 'stretch',
        justifyContent: 'center',
    },

    normalText: {
        color: '$baseTextColorDark',
        fontSize: '16rem',
    },
    textDark: {
        color: '$baseTextColorDark',
    },
    textLight: {
        color: '$baseTextColorLight',
    },
    flex1: {
        flex: 1,
    },
    textKey: {
        flex: 3,
        fontSize: '16rem',
        fontWeight: '300',
        marginLeft: '$baseMarginView',
        color: '$baseTextColorLight',
    },
    textValue: {
        flex: 7,
        fontSize: '16rem',
        fontWeight: '500',
        marginLeft: '$baseMarginView',
        color: '$baseTextColorDark',
    },
    viewKeyValue: {
        marginBottom: '$baseMarginViewSmall',
        flexDirection: 'row',
    },
    ticketContainer: {
        alignContent: 'stretch',
        alignSelf: 'stretch',
        alignItems: 'stretch',
        marginLeft: '$baseMarginView',
        marginRight: '$baseMarginView',
        marginTop: '$baseMarginView',
        paddingBottom: '$baseMarginViewSmall',
        borderRadius: '$baseBorderRadius',
        borderWidth: 0,
        borderColor: 'transparent',
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowRadius: '16rem',
                shadowOpacity: 0.08,
                shadowColor: '#455B63',
            },
            android: {
                shadowOpacity: 0.2,
                elevation: 2,
            },
        }),
    },
})
