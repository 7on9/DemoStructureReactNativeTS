import React from 'react'
import { Modal, View, TouchableWithoutFeedback, Animated } from 'react-native'
import { connect } from 'react-redux'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import EStyleSheet from 'react-native-extended-stylesheet'
import PropTypes from 'prop-types'
import { LOCALE_CALENDAR_EN, LOCALE_CALENDAR_VN } from '../config/appConstants'

LocaleConfig.locales['vi'] = LOCALE_CALENDAR_VN
LocaleConfig.locales['en'] = LOCALE_CALENDAR_EN
LocaleConfig.defaultLocale = 'vi'

class _calendarModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isShow: false,
            locale: props.locale,
            fadeColor: new Animated.Value(0),
            shown: false,
        }
    }
    static getDerivedStateFromProps(props, state) {
        if (props.locale != state.locale) {
            LocaleConfig.defaultLocale = props.locale
            return {
                locale: props.locale,
            }
        }
        return null
    }

    show = () => {
        // this.state.fadeColor.setValue(0)
        this.setState({ isShow: true, shown: false })
    }

    hide = () => {
        const { onHide } = this.props
        // this.setState({ backgroundColor: new Animated.Value(1) })
        // this.state.fadeColor.setValue(1)
        // Animated.timing(this.state.fadeColor, { toValue: 0 }).start(() => {
        this.setState({ isShow: false, shown: false }, () => {
            onHide && onHide()
        })
        // })
    }
    onDaySelected = day => {
        if (this.props.onDaySelected) {
            this.props.onDaySelected(day)
        }
    }
    onModalShown = () => {
        // this.setState(
        //     { shown: true }
        // ,() => {
        // Animated.timing(this.state.fadeColor, {
        //     toValue: 1,
        //     duration: 100,
        // useNativeDriver: true,
        // }
        // )
        //.start()
        // })
    }

    render() {
        const { isShow } = this.state
        let { minDate, maxDate } = this.props
        if (minDate == undefined) {
            minDate = true
        }
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
        return (
            <Modal
                style={styles.modalCalendar}
                ref={ref => {
                    this.modalCalendar = ref
                }}
                onShow={this.onModalShown}
                visible={this.state.isShow}
                transparent={true}
                animationType="fade"
                onRequestClose={() => {
                    return false
                }}
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
                    <Calendar
                        ref={ref => {
                            this.calendar = ref
                        }}
                        style={{
                            height: 420,
                        }}
                        theme={{
                            textMonthFontWeight: 'bold',
                            textDayHeaderFontSize: 14,
                            selectedDayBackgroundColor: '#f0f',
                        }}
                        // current={curr}
                        minDate={minDate}
                        maxDate={maxDate}
                        hideExtraDays={true}
                        onDayPress={this.onDaySelected}
                        firstDay={1}
                        isHighlightWeekend={true}
                    />
                </View>
            </Modal>
        )
    }
}

_calendarModal.propTypes = {
    onDaySelected: PropTypes.func,
    locale: PropTypes.string,
    onHide: PropTypes.func,
}
const mapStateToProps = state => {
    return {
        locale: state.appConfig.locale,
    }
}
export const CalendarModal = connect(
    mapStateToProps,
    null,
    null,
    { withRef: true }
)(_calendarModal)

const styles = EStyleSheet.create({
    modalCalendar: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: '#00000000',
    },
})
