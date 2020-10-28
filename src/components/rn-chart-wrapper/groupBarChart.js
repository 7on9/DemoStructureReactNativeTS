import React from 'react'
import { Text, processColor, View } from 'react-native'
import { Card } from 'native-base'
import { BarChart } from 'react-native-charts-wrapper'
import { styles } from './styles'
import { formatNumber } from '../../utils/text-uils'
import _ from 'lodash'
import { ChartColorTheme } from '../colorTheme'

export const groupBarChart = props => {
    let { id, chartStyle, containerStyle, chartConfig, chartTitle } = props
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
            <BarChart
                {...chartConfig}
                style={{
                    ...chartStyle,
                    flex: 4,
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
 * @param {*} data
 * @returns {Object} Bar chart Template
 */
export const createGroupBarChartTemplate = arrData => {
    let arrValueFormatter = arrData.map(data => data.yAxis.map(item => formatNumber(item.y)))
    // let maxLengthValue = -Infinity
    // let isHourLabel = data.title.toLowerCase().indexOf('giờ') >= 0
    // data.xAxis = data.xAxis.map(time => {
    //     time = isHourLabel
    //         ? (parseInt(time) + new Date().getTimezoneOffset() / -60).toString()
    //         : time
    //     maxLengthValue = maxLengthValue < time.length ? time.length : maxLengthValue
    //     return time.toString()
    // })
    let arrs = arrData.map(data => data.xAxis)
    let cbXAxis = _.union(...arrs)
    return {
        legend: {
            textSize: 9,
            enabled: true,
            form: 'SQUARE',
            formSize: 14,
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
        data: {
            dataSets: arrData.map((data, id) => {
                return {
                    values: [...data.yAxis],
                    label: data.title,
                    // colors: [processColor(ChartColorTheme.NIVO_1[id])],
                    config: {
                        drawValues: false,
                        valueFormatter: arrValueFormatter[id],
                        colors: [processColor(ChartColorTheme.NIVO_1[id])],
                        // barShadowColor: processColor('lightgrey'),
                        // highlightAlpha: 90,
                        // highlightColor: processColor('red'),
                    },
                }
            }),
            config: {
                // barWidth: 0.8,
                barWidth: 0.5,
                group: {
                    fromX: -1,
                    groupSpace: 0.1,
                    barSpace: 0.1,
                },
            },
        },
        highlights: [],
        drawValueAboveBar: false,
        xAxis: {
            granularity: 1,
            axisMinimum: -1,
            axisLineWidth: 1.5,
            drawAxisLine: true,
            position: 'BOTTOM',
            drawGridLines: false,
            labelRotationAngle: 45, //maxLengthValue <= 4 ? 0 : 45,
            granularityEnabled: true,
            centerAxisLabels: true,
            valueFormatter: cbXAxis,
            axisMaximum: cbXAxis.length,
            valueFormatterPattern: 'DD/MM/YYYY',
        },
        yAxis: {
            left: {
                axisLineWidth: 1.5,
                drawAxisLine: true,
                drawGridLines: false,
                granularityEnabled: true,
                valueFormatter: 'largeValue',
            },
            right: {
                enabled: false,
            },
        },
        drawBarShadow: false,
        drawHighlightArrow: true,
        chartDescription: { text: '' },
        gridBackgroundColor: processColor('transparent'),
        animation: { durationX: 700, durationY: 700, easingY: 'EaseInOutQuart' },
    }
}
