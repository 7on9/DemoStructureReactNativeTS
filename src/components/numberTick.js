import React from 'react'
import { View, Text, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import { Icon, Button } from 'native-base'
import { strings } from '../config/i18n'
import EStyleSheet from 'react-native-extended-stylesheet'

export default class numberTick extends React.Component {
    static propTypes = {
        onNumberChanged: PropTypes.func,
        title: PropTypes.string.isRequired,
        maxValue: PropTypes.number.isRequired,
        minValue: PropTypes.number.isRequired,
        stepChange: PropTypes.number,
        style: ViewPropTypes.style,
        defaultValue: PropTypes.number,
        titlePosition: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    }
    static defaultProps = {
        onNumberChanged: null,
        minValue: 0,
        stepChange: 1,
        style: {},
        titlePosition: 'left',
        defaultValue: 0,
    }
    constructor(props) {
        super(props)
        this.state = {
            currentNumber: props.defaultValue,
        }
    }

    doChangeNumber = step => {
        let passCount = this.state.currentNumber
        passCount += step
        if (passCount < this.props.minValue) {
            passCount = this.props.minValue
        }
        if (passCount > this.props.maxValue) {
            passCount = this.props.maxValue
        }

        this.setState({ currentNumber: passCount }, () => {
            this.props.onNumberChanged && this.props.onNumberChanged(this.state.currentNumber)
        })
    }
    getCount = () => {
        return this.state.currentNumber
    }
    render() {
        return (
            <View style={{ ...styles.rowView, ...this.props.style }}>
                <Text style={styles.title}>{this.props.title}</Text>
                <View style={styles.buttonGroup}>
                    <Button
                        style={styles.button}
                        transparent
                        onPress={() => {
                            this.doChangeNumber(-this.props.stepChange)
                        }}
                    >
                        <Icon style={styles.changeIcon} name="minus-circle" type="FontAwesome5" />
                    </Button>
                    <Text style={styles.number}>{this.state.currentNumber}</Text>
                    <Button
                        style={styles.button}
                        transparent
                        onPress={() => {
                            this.doChangeNumber(this.props.stepChange)
                        }}
                    >
                        <Icon style={styles.changeIcon} name="plus-circle" type="FontAwesome5" />
                    </Button>
                </View>
            </View>
        )
    }
}

const styles = EStyleSheet.create({
    rowView: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        paddingLeft: 10,
        margin: 0,
        borderWidth: 0.5,
        borderRadius: 8,
        marginLeft: 10,
        marginRight: 10,
        // backgroundColor: 'red',
        // paddingRight: 10,
        // marginTop: 10,
    },
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderWidth: 0.5,
        borderRadius: 8,
        marginLeft: 10,
        marginRight: 10,
    },
    containnerInvalid: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderWidth: 2,
        borderRadius: 8,
        marginLeft: 10,
        marginRight: 10,
        borderColor: '#d9534f',
    },
    title: {
        fontSize: 16,
        fontWeight: '300',
        // margin: 5,
        flex: 5,
        alignSelf: 'center',
    },
    changeIcon: {
        fontSize: 22,
        color: '#42CB10',
        alignSelf: 'center',
        marginLeft: 0,
        marginRight: 0,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 3,
    },
    number: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        flex: 2,
    },
    button: {
        flex: 3,
        padding: 0,
        marginHorizontal: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
})
