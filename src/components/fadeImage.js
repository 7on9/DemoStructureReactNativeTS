import React from 'react'
import { Animated, Platform, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import { hashString } from '../utils/text-uils'
let RNFS = require('react-native-fs')

export default class fadeImage extends React.Component {
    static propTypes = {
        style: ViewPropTypes.style,
        source: PropTypes.string.isRequired,
    }
    static defaultProps = {
        style: {},
        source: null,
    }
    constructor(props) {
        super(props)
        this.state = {
            opacity: new Animated.Value(0),
            source: null,
        }
    }
    onLoadEnd = result => {}
    onError = evt => {
        if (evt.nativeEvent.error) {
            this.setState({ source: require('../assets/no-image-icon.png') })
        }
    }
    onLoad = () => {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start()
    }

    loadFile = path => {
        this.setState({ source: { uri: path } })
    }
    downloadFile = (uri, savePath) => {
        RNFS.downloadFile({ fromUrl: uri, toFile: savePath }).promise.then(res => {
            console.log('downloaded res:', res)
            this.loadFile(savePath)
        })
    }
    componentDidMount() {
        const { source } = this.props
        const ext = Platform.OS === 'android' ? 'file://' : ''
        const idxFileExt = source.lastIndexOf('.')
        const fileExt = idxFileExt != -1 ? source.substring(idxFileExt) : ''
        const saveName = hashString(source)
        const savePath = `${ext}${RNFS.CachesDirectoryPath}/${saveName}${fileExt}`
        RNFS.exists(savePath).then(exists => {
            if (exists) {
                this.loadFile(savePath)
            } else {
                this.downloadFile(source, savePath)
            }
        })
    }

    render() {
        return (
            <Animated.Image
                onLoad={this.onLoad}
                onLoadEnd={this.onLoadEnd}
                onError={this.onError}
                style={{ ...this.props.style, opacity: this.state.opacity }}
                source={this.state.source}
            />
        )
    }
}
