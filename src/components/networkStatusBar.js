import React from 'react'
import { NetInfo } from 'react-native'

import { Text, Item, Icon } from 'native-base'
import { strings } from '../config/i18n'
import { changeNetworkState } from '../actions/networkAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class networkStatusBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isConnected: true,
        }
    }
    handleConnectionChange = isConnected => {
        this.setState({ isConnected }, () => {
            this.props.changeNetworkState({ isConnected })
        })
    }
    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange)
        NetInfo.isConnected.fetch().then(isConnected => {
            this.setState({ isConnected })
        })
    }
    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange)
    }

    render() {
        if (this.state.isConnected) {
            return null
        }
        return (
            <Item
                style={{
                    backgroundColor: 'lightgray',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* <Icon type="FontAwesome" name="exclamation" style={{ color: 'yellow' }} /> */}
                <Text
                    style={{
                        alignSelf: 'center',
                        color: 'red',
                        marginTop: 4,
                        marginBottom: 4,
                        fontSize: 20,
                    }}
                >
                    {strings('general.networkError')}
                </Text>
            </Item>
        )
    }
}

const mapStateToProps = state => {
    return {
        isConnected: state.appConfig.isConnected,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        changeNetworkState: bindActionCreators(changeNetworkState, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(networkStatusBar)
