import React from 'react'
import { Icon } from 'native-base'
import EStyleSheet from 'react-native-extended-stylesheet'
import { View, Image, Platform, Alert, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { APP_SIZE, APP_COLORS, BUILD_TYPE, BUILD_TYPE_RELEASE } from '../config/appConstants'
import { AppText } from '.'
import { version } from '../../package.json'
import Images from '@assets/images'
import { shadow } from './shadow'
import { strings } from '../config/i18n'
import { bindActionCreators } from 'redux'
import { logOut } from '../actions/authAction'
import _ from 'lodash'
import * as ScreenNames from '../screens/screenNames'
import { ScrollView } from 'react-native-gesture-handler'
import { rem } from '../utils/text-uils'

class sideBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shadowOffsetWidth: 1,
            shadowRadius: 4,
            currentScreen: '',
            locale: '',
            screens: [],
        }
    }
    static getDerivedStateFromProps(props, state) {
        if (props.locale != state.locale) {
            let screens = [
                {
                    name: strings('screensTitle.dashboard'),
                    route: ScreenNames.Home,
                    leftIcon: 'home',
                    rightIcon: 'angle-right',
                    type: 'FontAwesome',
                    subChildren: [],
                },
                // {
                //     name: 'Doanh thu',
                //     route: 'RevenueScreen',
                //     leftIcon: 'viacoin',
                //     rightIcon: 'angle-right',
                //     type: 'FontAwesome',
                //     subChildren: [],
                // },
                {
                    name: strings('screensTitle.chart'),
                    route: ScreenNames.Chart,
                    leftIcon: 'bar-chart',
                    rightIcon: 'angle-right',
                    subChildren: [],
                },
                {
                    name: strings('screensTitle.route'),
                    route: ScreenNames.Route,
                    leftIcon: 'route',
                    rightIcon: 'angle-right',
                    type: 'FontAwesome5',
                    subChildren: [],
                },
                // {
                //     name: strings('screensTitle.trip'),
                //     route: ScreenNames.Trip,
                //     leftIcon: 'shuttle-van',
                //     rightIcon: 'angle-right',
                //     type: 'FontAwesome5',
                //     subChildren: [],
                // },
                {
                    name: strings('screensTitle.listVehicles'),
                    route: ScreenNames.Vehicle,
                    leftIcon: 'bus',
                    rightIcon: 'angle-right',
                    type: 'FontAwesome5',
                    subChildren: [],
                },
                {
                    name: strings('screensTitle.vehicleTracking'),
                    route: ScreenNames.VehicleTracking,
                    leftIcon: 'map-marked-alt',
                    rightIcon: 'angle-right',
                    type: 'FontAwesome5',
                    subChildren: [],
                },
                {
                    name: strings('screensTitle.profile'),
                    route: ScreenNames.Profile,
                    leftIcon: 'cog',
                    rightIcon: 'angle-right',
                    subChildren: [],
                },
                {
                    name: strings('screensTitle.aboutUs'),
                    route: ScreenNames.InfoApp,
                    leftIcon: 'info-circle',
                    rightIcon: 'angle-right',
                    type: 'FontAwesome5',
                    subChildren: [],
                },
            ]
            if (props.setting && props.setting.hide) {
                screens = screens.filter(sc => {
                    if (!props.setting.hide[sc.route]) {
                        return sc
                    }
                })
            }
            return {
                locale: props.locale,
                screens,
            }
        }
        if (props.activeItemKey != state.currentScreen) {
            return {
                currentScreen: props.activeItemKey,
            }
        }
        return null
    }

    doLogout = async () => {
        Alert.alert(
            strings('dialog.logout'),
            strings('dialog.confirmLogout'),
            [
                {
                    text: strings('dialog.logout'),
                    onPress: () => {
                        this.props.logOut({ navigation: this.props.navigation })
                    },
                },
                {
                    text: strings('dialog.cancel'),
                    onPress: () => {},
                    style: 'cancel',
                },
            ],
            { cancelable: true }
        )
    }

    renderItem = ({ item, style }) => {
        // const { item, index } = data
        const bgColor =
            item.route == this.state.currentScreen ? 'rgba(0, 0, 0, 0.2)' : 'transparent'
        const iconColor = item.route == this.state.currentScreen ? '#52489C' : '#206BA4'
        // const iconColor = item.route == this.state.currentScreen ? '#003366' : '#206BA4'

        return (
            <View
                style={[
                    styles.itemContainer,
                    {
                        backgroundColor: bgColor,
                    },
                    style,
                ]}
                onTouchStart={() => {
                    this.props.navigation.navigate(item.route)
                }}>
                <View style={{ flex: 3 }}>
                    <Icon
                        style={{ ...styles.icon, color: iconColor }}
                        name={item.leftIcon}
                        type={item.type || 'FontAwesome'}
                    />
                </View>
                <View style={{ flex: 9, ...styles.textItemContainer }}>
                    <AppText style={styles.textItem}>{item.name}</AppText>
                </View>
                <View style={{ flex: 2, alignItems: 'flex-end' }}>
                    <Icon style={styles.icon} name={item.rightIcon} type="FontAwesome" />
                </View>
            </View>
        )
    }

    render() {
        const { screens } = this.state
        const { user = {} } = this.props
        const { avatar, fullName, phone, email } = user
        return (
            <View style={styles.container}>
                {Platform.OS === 'ios' ? (
                    <View
                        style={{
                            height: APP_SIZE.statusBarHeight,
                            // backgroundColor: 'rgba(60,181,75,0.5)',
                            // backgroundColor: APP_COLORS.main,
                        }}
                    />
                ) : null}
                <View style={styles.profile}>
                    <Image
                        source={!avatar ? Images.editProfìle : { uri: avatar }}
                        style={{
                            fontSize: rem(70),
                            color: 'lightgray',
                            width: APP_SIZE.widthScreen * 0.25,
                            height: APP_SIZE.widthScreen * 0.25,
                            alignSelf: 'center',
                            ...shadow(4),
                            margin: rem(8),
                            borderRadius: (APP_SIZE.widthScreen * 0.25) / 2,
                        }}
                    />
                    <AppText
                        adjustsFontSizeToFit={true}
                        minimumFontScale={0.9}
                        numberOfLines={1}
                        style={{
                            // alignSelf: 'flex-start',
                            alignSelf: 'center',
                            fontSize: rem(18),
                            color: APP_COLORS.text.dark,
                        }}>
                        {fullName}
                    </AppText>
                    <AppText
                        adjustsFontSizeToFit={true}
                        minimumFontScale={0.9}
                        numberOfLines={1}
                        style={{
                            // alignSelf: 'flex-start',
                            alignSelf: 'center',
                            fontSize: rem(15),
                            color: APP_COLORS.text.dark,
                            marginTop: rem(4),
                        }}>
                        {phone}
                    </AppText>
                    <AppText
                        adjustsFontSizeToFit={true}
                        minimumFontScale={0.9}
                        numberOfLines={1}
                        style={{
                            alignSelf: 'center',
                            fontSize: rem(15),
                            color: APP_COLORS.text.dark,
                            marginTop: rem(4),
                        }}>
                        {email}
                    </AppText>
                </View>
                <ScrollView style={styles.listContainer}>
                    {screens.map(item => this.renderItem({ item }))}
                </ScrollView>
                <View
                    style={{
                        marginBottom: Platform.OS === 'ios' ? rem(20) : 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <AppText
                        style={{
                            color: APP_COLORS.text.dark,
                            fontSize: rem(12),
                        }}>
                        {`${strings('label.version')} ${version} ${
                            BUILD_TYPE === BUILD_TYPE_RELEASE ? '' : '- ALPHA'
                        }`}
                    </AppText>
                    <TouchableOpacity
                        onPress={this.doLogout}
                        style={{ padding: rem(8) }}>
                        <AppText
                            style={{
                                color: '#ed2f2f',
                                marginBottom: rem(8),
                                fontSize: rem(17),
                            }}>
                            {strings('buttons.logoutNormal')}
                        </AppText>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        locale: state.appConfig.locale,
        user: state.auth.user.user,
        setting: _.get(state, 'auth.user.company.setting.manager.menu'),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logOut: bindActionCreators(logOut, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(sideBar)

const styles = EStyleSheet.create({
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
        width: APP_SIZE.widthScreen * 0.25,
        height: APP_SIZE.widthScreen * 0.25,
        borderWidth: 1,
        borderColor: APP_COLORS.text.dark,
        borderRadius: (APP_SIZE.widthScreen * 0.25) / 2,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    listContainer: {
        backgroundColor: 'transparent', //'#f5f5f5',
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
        paddingTop: 10,
        paddingBottom: 10,
        height: APP_SIZE.heightScreen * 0.065,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: APP_COLORS.text.dark,
        borderBottomWidth: 0.35,
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
