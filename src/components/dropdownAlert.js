import React from 'react'
import PropTypes from 'prop-types'
import {
    View,
    Animated,
    StatusBar,
    PanResponder,
    SafeAreaView,
    TouchableOpacity,
    Platform,
    StyleSheet,
    Text,
    Dimensions,
} from 'react-native'

import { Icon } from 'native-base'
const WINDOW = Dimensions.get('window')
const HEIGHT = WINDOW.height
const WIDTH = WINDOW.width

export default class DropdownAlert extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        titleProps: PropTypes.object,
        titleStyle: PropTypes.object,
        message: PropTypes.string.isRequired,
        messageProps: PropTypes.object,
        textStyle: PropTypes.object,
        infoColor: PropTypes.string,
        warnColor: PropTypes.string,
        errorColor: PropTypes.string,
        successColor: PropTypes.string,
        defaultContainer: PropTypes.object,
        containerStyle: PropTypes.object,
        textContainerStyle: PropTypes.object,
        defaultTextContainer: PropTypes.object,
        topValue: PropTypes.number,
        startDelta: PropTypes.number,
        endDelta: PropTypes.number,
        panResponderEnabled: PropTypes.bool,
        sensitivity: PropTypes.number,
        tabToCloseEnable: PropTypes.bool,
        closeInterval: PropTypes.number,
    }
    static defaultProps = {
        title: '',
        titleProps: {},
        titleStyle: {
            fontSize: 16,
            textAlign: 'left',
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: 'transparent',
        },
        message: '',
        messageProps: {},
        textStyle: {
            fontSize: 14,
            textAlign: 'left',
            fontWeight: 'normal',
            color: 'white',
            backgroundColor: 'transparent',
        },
        infoColor: '#2B73B6',
        warnColor: '#cd853f',
        errorColor: '#cc3232',
        successColor: '#32A54A',
        defaultContainer: {
            flexDirection: 'row',
            // padding: 8,
            marginTop: Platform.OS == 'ios' ? 20 : 0,
        },
        defaultTextContainer: {
            flexDirection: 'column',
            flex: 1,
            padding: 8,
        },
        containerStyle: {},
        textContainerStyle: {},
        topValue: 0,
        startDelta: -100,
        endDelta: 0,
        panResponderEnabled: true,
        sensitivity: 20,
        tabToCloseEnable: true,
        closeInterval: 3000,
    }
    constructor(props) {
        super(props)
        this.typeValues = ['info', 'warn', 'error', 'success']
        this.types = {
            INFO: 'info',
            WARN: 'warn',
            ERROR: 'error',
            SUCCESS: 'success',
        }
        this.state = {
            isOpen: false,
            type: '',
            message: '',
            title: '',
            animatedValue: new Animated.Value(0),
            duration: 500,
            startDelta: props.startDelta,
            endDelta: props.endDelta,
        }
    }
    componentDidMount() {
        this.createPanResponder()
    }
    validType(type) {
        if (!type || type.length == 0 || !this.typeValues.includes(type)) {
            return false
        }
        return true
    }
    createPanResponder = () => {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => {
                return this.props.panResponderEnabled
            },
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return (
                    Math.abs(gestureState.dx) < this.props.sensitivity &&
                    Math.abs(gestureState.dy) >= this.props.sensitivity &&
                    this.props.panResponderEnabled
                )
            },
            onPanResponderMove: (evt, gestureState) => {
                if (gestureState.dy < 0) {
                    this.setState({
                        topValue: gestureState.dy,
                    })
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                const delta = this.state.startDelta / 5
                if (gestureState.dy < delta) {
                    this.close('pan')
                }
            },
            onPanResponderTerminate: (evt, gestureState) => {
                const delta = this.state.startDelta / 5
                if (gestureState.dy < delta) {
                    this.close('pan')
                }
            },
        })
    }
    getStyleFortype(type) {
        const { defaultContainer } = this.props
        switch (type) {
            case this.types.INFO:
                return [
                    StyleSheet.flatten(defaultContainer),
                    { backgroundColor: this.props.infoColor },
                ]
            case this.types.WARN:
                return [
                    StyleSheet.flatten(defaultContainer),
                    { backgroundColor: this.props.warnColor },
                ]
            case this.types.ERROR:
                return [
                    StyleSheet.flatten(defaultContainer),
                    { backgroundColor: this.props.errorColor },
                ]
            case this.types.SUCCESS:
                return [
                    StyleSheet.flatten(defaultContainer),
                    { backgroundColor: this.props.successColor },
                ]
            default:
                return [
                    StyleSheet.flatten(defaultContainer),
                    StyleSheet.flatten(this.props.containerStyle),
                ]
        }
    }
    animated(toValue, doneEvent) {
        Animated.spring(this.state.animatedValue, {
            toValue,
            duration: this.state.duration,
            friction: 9,
            useNativeDriver: true,
        }).start(doneEvent)
    }
    onLayoutEvent(evt) {
        const { x, y, width, height } = evt.nativeEvent.layout
        var actualStartDelta = this.state.startDelta
        var actualEndDelta = this.state.endDelta
        const { startDelta, endDelta } = this.props
        if (startDelta < 0) {
            const delta = 0 - height
            if (delta != startDelta) {
                actualStartDelta = delta
            }
        } else if (startDelta > WINDOW.height) {
            actualStartDelta = WINDOW.height + height
        }
        if (endDelta < 0) {
            actualEndDelta = 0
        } else if (endDelta > WINDOW.height) {
            actualEndDelta = WINDOW.height - height
        }
        const heightDelta = WINDOW.height - endDelta - height
        if (heightDelta < 0) {
            actualEndDelta = endDelta + heightDelta
        }
        if (actualStartDelta != this.state.startDelta || actualEndDelta != this.state.endDelta) {
            this.setState({
                startDelta: actualStartDelta,
                endDelta: actualEndDelta,
            })
        }
    }
    showAlert = (type, title, message, interval) => {
        if (!this.validType(type)) {
            return
        }
        if (typeof title !== 'string') {
            title = `${title}`
        }
        if (typeof message !== 'string') {
            message = `${message}`
        }
        this.setState({ type, title, message, isOpen: true, topValue: 0 }, () => {
            if (this.state.isOpen) {
                this.animated(1)
            } else {
                this.animated(0)
            }
        })
        const closeInterval =
            typeof interval === 'number' && interval > 1 ? interval : this.props.closeInterval
        if (closeInterval > 1) {
            if (this._closeTimeoutId != null) {
                clearTimeout(this._closeTimeoutId)
            }
            this._closeTimeoutId = setTimeout(
                function() {
                    this.close()
                }.bind(this),
                closeInterval
            )
        }
    }
    close = () => {
        if (this.state.isOpen) {
            this.animated(0, () => {
                this.setState({ isOpen: false })
                if (this._closeTimeoutId != null) {
                    clearTimeout(this._closeTimeoutId)
                }
            })
        }
    }
    renderIcon() {}
    renderTitle() {
        const { title } = this.state
        return title == null || title == '' ? null : (
            <Text style={this.props.titleStyle}>{this.state.title}</Text>
        )
    }
    renderMessage() {
        return <Text style={this.props.textStyle}>{this.state.message}</Text>
    }
    render() {
        const { isOpen, type } = this.state
        if (!isOpen) {
            return null
        }
        const style = this.getStyleFortype(type)
        const wrappedStyle = {
            transform: [
                {
                    translateY: this.state.animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [this.state.startDelta, this.state.endDelta],
                    }),
                },
            ],
            position: 'absolute',
            top: this.state.topValue,
            left: 0,
            right: 0,
        }

        return (
            <Animated.View
                ref={ref => (this.container = ref)}
                {...this._panResponder.panHandlers}
                style={wrappedStyle}
            >
                <TouchableOpacity
                    onLayout={evt => this.onLayoutEvent(evt)}
                    activeOpacity={0.95}
                    onPress={!this.props.tabToCloseEnable ? null : () => this.close()}
                    disabled={!this.props.tabToCloseEnable}
                >
                    <View style={style}>
                        {this.renderIcon()}
                        <View
                            style={[
                                StyleSheet.flatten(this.props.defaultTextContainer),
                                this.props.textContainerStyle,
                            ]}
                        >
                            {this.renderTitle()}
                            {this.renderMessage()}
                        </View>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        )
    }
}
