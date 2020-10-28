import React from 'react'
import { Text, processColor, View } from 'react-native'
import { Card } from 'native-base'
import { LineChart } from 'react-native-charts-wrapper'
import { styles } from './styles'
import { formatNumber } from '../../utils/text-uils'
import ChartColorTheme from '../colorTheme'
import _ from 'lodash'
import { DEFAULT_DATE_FORMAT } from '../../config/appConstants'

export const multipleLineChart = ({ id, chartStyle, containerStyle, chartConfig, chartTitle }) => {
    return !chartConfig ? null : (
        <Card key={id} style={containerStyle}>
            <View style={styles.headerContainer}>
                <Text
                    style={{
                        ...styles.headerText,
                        fontSize: containerStyle.height * styles.headerText.fontSize,
                    }}>
                    {chartTitle}
                </Text>
            </View>
            <LineChart
                {...chartConfig}
                style={{
                    ...chartStyle,
                    flex: 4.25,
                    width: '100%',
                    // height: '50%',
                    // maxWidth: containerStyle.width * 0.75,
                    alignSelf: 'center',
                }}
                // onSelect={this.handleSelect.bind(this)}
                // highlights={this.state.highlights}
                // onChange={event => console.log(event.nativeEvent)}
            />
        </Card>
    )
}

/**
 * Return template
 * @param {Array} arrData array data chart to combine
 * @returns {Object} Line chart Template
 */
export const createMultipleLineChartTemplateFromData = arrData => {
    // console.log(arrData)
    let arrValueFormatter = arrData.map(data => data.yAxis.map(item => formatNumber(item.y)))

    // arrValueFormatter.forEach(data => {
    //     let maxLengthValue = -Infinity
    //     let isHourLabel = data.title.toLowerCase().indexOf('giờ') >= 0
    //     data.xAxis = data.xAxis.map(time => {
    //         time = isHourLabel
    //             ? (parseInt(time) + new Date().getTimezoneOffset() / -60).toString()
    //             : time
    //         maxLengthValue = maxLengthValue < time.length ? time.length : maxLengthValue
    //         return time.toString()
    //     })
    // })
    let arrs = arrData.map(data => data.xAxis)
    let cbXAxis = _.union(...arrs)
    return {
        data: {
            dataSets: arrData.map((data, id) => {
                return {
                    values: [...data.values],
                    label: data.title,
                    config: {
                        // highlightLineWidth: 1,
                        valueFormatter: arrValueFormatter[id],
                        drawValues: true,
                        highlightAlpha: 90,
                        // mode: 'CUBIC_BEZIER',
                        color: processColor(ChartColorTheme.NIVO_1[id]),
                        circleColor: processColor(ChartColorTheme.NIVO_1[id]),
                        highlightColor: processColor('transparent'),
                        barShadowColor: processColor('transparent'),
                        lineWidth: 1.5,
                        drawFilled: true,
                        fillColor: processColor(ChartColorTheme.NIVO_1_TRANSPARENT[id]),
                        // fillGradient: {
                        //     colors: [processColor('red'), processColor('blue')],
                        //     // iOS
                        //     positions: [0, 1],
                        //     angle: 90,
                        //     // Android
                        //     orientation: 'TOP_BOTTOM',
                        // },
                        // fillAlpha: 18000,
                    },
                }
            }),
        },
        chartDescription: { text: '' },
        animation: {
            durationX: 700,
            durationY: 700,
            easingY: 'EaseInOutQuart',
        },
        // legend: { enabled: true },
        legend: {
            textSize: 9,
            enabled: true,
            form: 'CIRCLE',
            // xEntrySpace: 5,
            yEntrySpace: 5,
            formToTextSpace: 5,
            // color: '#000',
            fontFamily: 'OpenSans-Regular',
            wordWrapEnabled: true,
            orientation: 'HORIZONTAL',
            verticalAlignment: 'BOTTOM',
            horizontalAlignment: 'LEFT',
        },
        yAxis: {
            left: {
                axisLineWidth: 1.25,
                valueFormatter: 'largeValue',
                granularityEnabled: true,
                drawAxisLine: true,
                drawGridLines: true,
                // gridDashedLine: {
                //     lineLength: 10,
                //     spaceLength: 5,
                // },
                gridColor: processColor('rgba(105, 103, 101, 0.2)'),
            },
            right: {
                axisLineWidth: 1.25,
                valueFormatter: 'largeValue',
                granularityEnabled: true,
                drawAxisLine: true,
                drawGridLines: true,
                // gridDashedLine: {
                //     lineLength: 10,
                //     spaceLength: 5,
                // },
                gridColor: processColor('rgba(105, 103, 101, 0.2)'),
            },
        },
        xAxis: {
            granularity: 1,
            axisMinimum: -1,
            axisLineWidth: 1.25,
            drawAxisLine: true,
            drawGridLines: true,
            labelRotationAngle: 45,
            granularityEnabled: true,
            // centerAxisLabels: true,
            valueFormatter: cbXAxis,
            axisMaximum: cbXAxis.length,
            valueFormatterPattern: DEFAULT_DATE_FORMAT.VN,
            gridColor: processColor('rgba(105, 103, 101, 0.2)'),
            // gridDashedLine: {
            //     lineLength: 20,
            //     spaceLength: 20,
            // },
            // position: 'BOTTOM',
        },
        drawGridBackground: false,
        borderColor: processColor('teal'),
        borderWidth: 1,
        drawBorders: true,
        autoScaleMinMaxEnabled: true,
        touchEnabled: true,
        // dragEnabled: true,
        // scaleEnabled: true,
        // scaleXEnabled: true,
        // scaleYEnabled: true,
        // pinchZoom: true,
        // doubleTapToZoomEnabled: true,
        // highlightPerTapEnabled: true,
        // highlightPerDragEnabled: false,
        // visibleRange: this.state.visibleRange,
        dragDecelerationEnabled: false,
        dragDecelerationFrictionCoef: 0.99,
        keepPositionOnRotation: false,
    }
}
