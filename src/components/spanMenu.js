import React from 'react'
import { Animated, View, Text } from 'react-native'
import { Icon, Right, Button } from 'native-base'
import { strings } from '../config/i18n'
import EStyleSheet from 'react-native-extended-stylesheet'

export default class SpanMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isCollapsed: true,
            animatedSpan: new Animated.Value(0),
            contentHeight: 0,
        }
    }
    toggleSpan() {}
    onLayOutContent = layout => {
        this.setState({ contentHeight: layout.height })
    }
    render() {
        const { isSpanded, children } = this.props
        return (
            <Animated.View
                style={{
                    backgroundColor: 'white',
                    alignContent: 'stretch',
                    alignItems: 'stretch',
                    alignSelf: 'stretch',
                    height: this.state.animatedSpan,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'stretch',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        borderRadius: 8,
                        borderWidth: 0.5,
                    }}
                >
                    <Icon
                        name="user"
                        type="FontAwesome"
                        style={{ color: 'gray', alignSelf: 'center' }}
                    />
                    <Text style={styles.textItem}>{strings('selectseat.ticketDetail')}</Text>
                    <Right>
                        <Button transparent onPress={this.toogleTicket}>
                            <Icon name="arrow-forward" style={{ color: 'gray' }} />
                        </Button>
                    </Right>
                </View>
                {isSpanded ? (
                    <View
                        onLayout={evt => {
                            this.onLayOutContent(evt.nativeEvent.layout)
                        }}
                    >
                        {children}
                    </View>
                ) : null}
            </Animated.View>
        )
    }
}

const styles = EStyleSheet.create({
    container: {
        backgroundColor: 'red',
    },
    textItem: {
        fontSize: 20,
        marginLeft: 10,
        alignSelf: 'center',
    },
})
