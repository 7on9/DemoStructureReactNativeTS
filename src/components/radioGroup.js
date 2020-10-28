import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'

export class RadioButton extends React.Component {
    static defaultProps = {
        isSelected: false,
        buttonColor: '#050505',
        selectedButtonColor: '#42CB10',
        labelColor: '#050505',
        selectedLabelColor: '#42CB10',
        disabledColor: 'gray',
        labelHorizontal: false,
        disabled: false,
        sizeButton: 24,
        fontSize: 20,
        obj: {},
        onPress: null,
    }
    constructor(props) {
        super(props)
    }
    render() {
        const {
            labelHorizontal,
            onPress,
            obj,
            index,
            sizeButton,
            fontSize,
            isSelected,
        } = this.props
        const colorButton = isSelected ? this.props.selectedButtonColor : this.props.buttonColor
        const colorText = isSelected ? this.props.selectedLabelColor : this.props.labelColor
        return (
            <TouchableOpacity
                onPress={() => {
                    onPress && onPress(obj, index)
                }}
            >
                <View
                    style={{
                        flexDirection: labelHorizontal ? 'row' : 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }}
                >
                    <View
                        style={{
                            borderRadius: sizeButton / 2,
                            width: sizeButton,
                            height: sizeButton,
                            borderColor: colorButton,
                            borderWidth: 1,
                            margin: 8,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {isSelected ? (
                            <View
                                style={{
                                    borderRadius: (sizeButton - 8) / 2,
                                    width: sizeButton - 8,
                                    height: sizeButton - 8,
                                    backgroundColor: colorButton,
                                    alignSelf: 'center',
                                }}
                            />
                        ) : (
                            false
                        )}
                    </View>
                    <Text style={{ color: colorText, fontSize: fontSize }}>{obj && obj.label}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}
RadioButton.propTypes = {
    isSelected: PropTypes.bool,
    buttonColor: PropTypes.string,
    selectedButtonColor: PropTypes.string,
    labelColor: PropTypes.string,
    selectedLabelColor: PropTypes.string,
    disabledColor: PropTypes.string,
    labelHorizontal: PropTypes.bool,
    disabled: PropTypes.bool,
    idSeparator: PropTypes.string,
    onPress: PropTypes.func,
    obj: PropTypes.shape({ value: PropTypes.string, label: PropTypes.string }).isRequired,
    index: PropTypes.number,
    sizeButton: PropTypes.number,
    fontSize: PropTypes.number,
}

export default class RadioGroup extends React.Component {
    static defaultProps = {
        selectIndex: -1,
        data: [],
        flexDirection: 'row',
        onSelect: null,
        textStyle: {
            selectedColor: '#050505',
            disabledColor: 'gray',
            normalColor: '#050505',
            fontSize: 20,
        },
        buttonStyle: {
            selectedColor: '#42CB10',
            disabledColor: 'gray',
            normalColor: '#050505',
            sizeCircle: 24,
            sizePoint: 20,
        },
        style: {},
    }
    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: -1,
        }
    }

    _renderButton = (obj, idx) => {
        const { buttonStyle, textStyle, onSelect } = this.props
        const isSelected = idx == this.state.selectedIndex
        console.log('index:', idx, 'isSelected:', isSelected)
        return (
            <RadioButton
                index={idx}
                key={idx}
                isSelected={isSelected}
                buttonColor={buttonStyle.normalColor}
                selectedButtonColor={buttonStyle.selectedColor}
                labelColor={textStyle.normalColor}
                selectedLabelColor={textStyle.selectedColor}
                disabledColor={'gray'}
                labelHorizontal={true}
                disabled={false}
                sizeButton={buttonStyle.sizeCircle}
                fontSize={textStyle.fontSize}
                obj={obj}
                onPress={(value, index) => {
                    onSelect && onSelect(value, index)
                    this.setState({ selectedIndex: index })
                }}
            />
        )
    }
    render() {
        let renderItem = false
        if (this.props.data.length) {
            renderItem = this.props.data.map(this._renderButton)
        } else {
            renderItem = this.props.children
        }
        return (
            <View
                style={[
                    styles.container,
                    { flexDirection: this.props.flexDirection },
                    this.props.style,
                ]}
            >
                {renderItem}
            </View>
        )
    }
}
RadioGroup.propTypes = {
    selectIndex: PropTypes.number,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string,
        })
    ).isRequired,
    flexDirection: PropTypes.oneOf(['row', 'column']),
    onSelect: PropTypes.func,
    textStyle: PropTypes.shape({
        selectedColor: PropTypes.string,
        disabledColor: PropTypes.string,
        normalColor: PropTypes.string,
        fontSize: PropTypes.number,
    }),
    buttonStyle: PropTypes.shape({
        selectedColor: PropTypes.string,
        disabledColor: PropTypes.string,
        normalColor: PropTypes.string,
        sizeCircle: PropTypes.number,
        sizePoint: PropTypes.number,
    }),
    style: PropTypes.object,
    radioDirection: PropTypes.oneOf(['row', 'column']),
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
    },
})
