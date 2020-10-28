import React from 'react'
import { Modal, View, TouchableWithoutFeedback, Text, Animated } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Button } from 'native-base'
import { strings } from '../config/i18n'
import PropTypes from 'prop-types'
import { formatVND } from '../utils/text-uils'
const _ = require('lodash')
// const demotTicket = {
//     companyName: 'Hoàng long',
//     departureTime: '15:30, ngày 22/12/2018',
//     seats: 5,
//     boardingPoint: 'Bến xe miền đông',
//     droppingPoint: 'Bến xe quy nhơn',
//     total: 1000000,
// }
class ticketDetailModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isShow: false,
            shown: false,
            fadeColor: new Animated.Value(0),
            ticketInfo: null,
        }
    }
    show = (data, isTwoWay) => {
        console.log('All ticket modals', JSON.stringify(data))
        if (!isTwoWay) {
            this.setState({ isShow: true, shown: false, ticketInfo: data, isTwoWay })
        } else {
            this.setState({
                isShow: true,
                shown: false,
                ticketInfo: data,
                currentTab: 0,
                isTwoWay,
                depatingData: this.getDepatingData(data),
                returningData: this.getReturnData(data),
            })
        }

        // this.state.fadeColor.setValue(0)
    }
    onModalShown = () => {
        // this.setState({ shown: true }, () => {
        //     Animated.timing(this.state.fadeColor, { toValue: 1, duration: 200 }).start()
        // })
        // this.setState({ shown: true })
    }
    footerClickContinue = () => {
        this.hide()
        this.props.continueFunc && this.props.continueFunc()
    }
    hide = () => {
        // this.state.fadeColor.setValue(1)
        // Animated.timing(this.state.fadeColor, { toValue: 0, duration: 200 }).start(() => {
        //     this.setState({ isShow: false, shown: false })
        // })
        this.setState({ isShow: false, shown: false })
    }
    renderSingleTripInfo(ticketInfo) {
        console.log('ticket infor render single trip', JSON.stringify(ticketInfo))
        let strSeat = ''
        if (ticketInfo.selectedSeats) {
            for (let i = 0, length = ticketInfo.selectedSeats.length; i < length; i++) {
                const tt =
                    i == length - 1
                        ? ticketInfo.selectedSeats[i]
                        : `${ticketInfo.selectedSeats[i]},`
                strSeat = strSeat + tt
            }
        }
        if (Array.isArray(ticketInfo.pick_drop)) {
            ticketInfo.pick_drop = ticketInfo.pick_drop[0]
        }
        return (
            <View>
                <View tyle={styles.viewRow}>
                    <Text style={styles.textTitle}>{strings('selectseat.provider')}</Text>
                    <Text style={styles.textInfo}>{ticketInfo.companyName}</Text>
                </View>
                <View style={styles.viewRow}>
                    <Text style={styles.textTitle}>
                        {strings('selectseat.departureTime') + ':'}
                    </Text>
                    <Text style={styles.textInfo}>{ticketInfo.time}</Text>
                </View>
                <View style={styles.viewRow}>
                    <Text style={styles.textTitle}>{strings('selectseat.passenger') + ':'}</Text>
                    <Text style={styles.textInfo}>{ticketInfo.selectedSeats.length}</Text>
                </View>
                <View style={styles.viewRow}>
                    <Text style={styles.textTitle}>{strings('selectseat.position') + ':'}</Text>
                    <Text style={styles.textInfo}>{strSeat}</Text>
                </View>
                <View style={styles.viewRow}>
                    <Text style={styles.textTitle}>{strings('selectseat.lbBoarding') + ':'}</Text>
                    <Text style={styles.textInfo}>{ticketInfo.pick_drop.pickPoint.name}</Text>
                </View>
                <View style={styles.viewRow}>
                    <Text style={styles.textTitle}>{strings('selectseat.lbDropping') + ':'}</Text>
                    <Text style={styles.textInfo}>{ticketInfo.pick_drop.dropPoint.name}</Text>
                </View>
                <View style={styles.viewRow}>
                    <Text style={styles.textTitle}>{strings('selectseat.total') + ':'}</Text>
                    <Text style={styles.textInfo}>{`${formatVND(ticketInfo.total)} đ`}</Text>
                </View>
            </View>
        )
    }
    changeTab = newTab => {
        const { currentTab } = this.state
        if (currentTab == 0 && newTab == 1) {
            if (this.state.returningData != null) {
                this.setState({ currentTab: 1 })
            }
        } else if (currentTab == 1 && newTab == 0) {
            this.setState({ currentTab: 0 })
        }
    }
    renderTab = (text, isSelected, tabIdx) => {
        const textStyle = {
            color: isSelected ? '#42CB10' : '#05050599',
            fontSize: 16,
            fontWeight: '300',
        }
        const { currentTab } = this.state
        return (
            <Button
                block
                transparent
                style={{
                    flex: 1,
                    borderTopLeftRadius: 8,
                    borderBottomWidth: 2,
                    borderRadius: 0,
                    height: 30,
                    borderBottomColor: currentTab == tabIdx ? '#42CB10' : 'lightgray',
                }}
                onPress={() => {
                    this.changeTab(tabIdx)
                }}
            >
                <Text style={textStyle}>{text}</Text>
            </Button>
        )
    }
    getDepatingData(data) {
        const ticketInfo = data

        const dt = {
            pick_drop: ticketInfo.pick_drop[0],
            time: ticketInfo.time[0],
            companyName: ticketInfo.companyName[0],
            selectedSeats: ticketInfo.selectedSeats[0],
            total: ticketInfo.total,
            tripIds: ticketInfo.tripIds[0],
            charges: _.filter(ticketInfo.charges, { tripId: ticketInfo.tripIds[0] }),
        }
        console.log('depating data:', dt)
        return dt
    }
    getReturnData(data) {
        const ticketInfo = data
        const dt = {
            pick_drop: ticketInfo.pick_drop[1],
            time: ticketInfo.time[1],
            companyName: ticketInfo.companyName[1],
            selectedSeats: ticketInfo.selectedSeats[1],
            total: ticketInfo.total,
            tripIds: ticketInfo.tripIds[1],
            charges: _.filter(ticketInfo.charges, { tripId: ticketInfo.tripIds[1] }),
        }
        console.log('dataReturning:', dt)
        return dt
    }
    renderTwoWayTrips() {
        const { currentTab, depatingData, returningData } = this.state
        console.log('DepatingDATa:', JSON.stringify(depatingData))
        console.log('Returning Data:', JSON.stringify(returningData))
        return (
            <View style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'stretch',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        // borderBottomWidth: 0.5,
                    }}
                >
                    {this.renderTab(strings('selectseat.departingRoute'), currentTab == 0, 0)}
                    {this.renderTab(strings('selectseat.returningRoute'), currentTab == 1, 1)}
                </View>
                {currentTab == 0
                    ? this.renderSingleTripInfo(depatingData)
                    : this.renderSingleTripInfo(returningData)}
            </View>
        )
    }
    render() {
        const { isShow, ticketInfo, isTwoWay } = this.state
        let bgColor = '#000000aa'
        // if (!isShow) {
        //     bgColor = this.state.fadeColor.interpolate({
        //         inputRange: [0, 1],
        //         outputRange: ['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0)'],
        //     })
        // } else {
        //     bgColor = this.state.fadeColor.interpolate({
        //         inputRange: [0, 1],
        //         outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.3)'],
        //     })
        // }
        // if (!this.state.shown) {
        //     bgColor = '#00000000'
        // }
        if (!ticketInfo) {
            return null
        }
        return (
            <Modal
                style={styles.modal}
                visible={this.state.isShow}
                transparent={true}
                animationType="fade"
                onRequestClose={() => {
                    return false
                }}
                onShow={this.onModalShown}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: bgColor,
                    }}
                >
                    <TouchableWithoutFeedback onPress={this.hide}>
                        <View
                            style={{
                                backgroundColor: 'transparent',
                                flex: 1,
                            }}
                        />
                    </TouchableWithoutFeedback>
                    <View
                        style={{
                            borderRadius: 8,
                            borderWidth: 0.5,
                            margin: 8,
                            backgroundColor: 'white',
                            alignContent: 'center',
                            // alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                borderBottomWidth: 0.5,
                                marginLeft: 8,
                                marginRight: 8,
                                marginBottom: 8,
                                justifyContent: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 22,
                                    margin: 8,
                                    fontWeight: '500',
                                    alignSelf: 'center',
                                }}
                            >
                                {strings('selectseat.ticketDetail')}
                            </Text>
                        </View>
                        {!isTwoWay
                            ? this.renderSingleTripInfo(this.state.ticketInfo)
                            : this.renderTwoWayTrips()}
                        <View style={{ margin: 8, flexDirection: 'row' }}>
                            <Button block onPress={this.hide} style={{ ...styles.button, flex: 1 }}>
                                <Text style={{ ...styles.buttonText, color: '#fff' }}>
                                    {strings('buttons.back')}
                                </Text>
                            </Button>
                            <View style={{ flex: 1 }} />
                            <Button
                                block
                                onPress={this.footerClickContinue}
                                style={{ ...styles.button, flex: 1 }}
                            >
                                <Text style={{ ...styles.buttonText, color: '#fff' }}>
                                    {strings('buttons.continue')}
                                </Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}
ticketDetailModal.propTypes = {
    ticketInfo: PropTypes.object.isRequired,
    goBack: PropTypes.func,
    continueFunc: PropTypes.func,
}

export default ticketDetailModal

const styles = EStyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: '#000000',
    },
    button: {
        alignSelf: 'stretch',
        margin: 8,
        backgroundColor: '#42CB10',
        borderRadius: 8,
        color: '#fff',
    },
    textTitle: {
        flex: 3,
        marginLeft: 8,
        marginRight: 8,
        fontSize: 16,
        fontWeight: '300',
    },
    textInfo: {
        flex: 6,
        marginLeft: 8,
        marginRight: 8,
        fontSize: 16,
        fontWeight: '500',
    },
    viewRow: {
        marginBottom: 8,
        flexDirection: 'row',
    },
})
