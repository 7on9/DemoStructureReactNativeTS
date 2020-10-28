/* eslint-disable react/prop-types */
import React, { FC } from 'react'
// eslint-disable-next-line import/named
import { BarChart, BarChartProps, BarValue } from 'react-native-charts-wrapper'
import { Card } from 'native-base'
import { ChartColorTheme } from '../colorTheme'
import { formatNumber } from '../../utils/text-uils'
import { RNChartProps } from './types'
import { strings } from '../../config/i18n'
import { styles } from './styles'
import { Text, processColor, View } from 'react-native'
import _ from 'lodash'

export const barChart: FC<RNChartProps> = ({
    chartStyle,
    containerStyle,
    chartConfig,
    chartTitle,
}) => {
    return !chartConfig ? null : (
        <Card style={containerStyle}>
            <View style={styles.headerContainer}>
                <Text
                    style={[
                        styles.headerText,
                        { fontSize: containerStyle.height * styles.headerText!.fontSize!, }
                    ]}>
                    {chartTitle}
                </Text>
            </View>
            <BarChart
                {...chartConfig as BarChartProps}
                // touchEnabled={false}
                doubleTapToZoomEnabled={true}
                style={{
                    ...chartStyle as object,
                    flex: 4,
                    width: '100%',
                    // height: '50%',
                    // maxWidth: containerStyle.width * 0.75,
                    alignSelf: 'center',
                }}
                legend={{ enabled: false }}
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
export const createBarChartTemplate = (data: { yAxis: Array<BarValue>, xAxis: string[], title: string }): BarChartProps => {
    const valueFormatter = data.yAxis.map(item => {
        // min = item.y < min ? item.y : min
        if (!item.y) {
            item!.y = 0
        }
        return formatNumber(item.y)
    })
    let maxLengthValue = -Infinity
    // let isHourLabel = data.title.toLowerCase().indexOf('giờ') >= 0
    data.xAxis = data.xAxis.map(time => {
        // time = isHourLabel
        //     ? (parseInt(time) + new Date().getTimezoneOffset() / -60).toString()
        //     : time
        let label = strings(`chartLabels.${time.trim()}`)
        label = label.charAt(0) === '[' ? time : label
        maxLengthValue = maxLengthValue < label.length ? label.length : maxLengthValue
        // maxLengthValue = maxLengthValue < time.length ? time.length : maxLengthValue
        return label //.toString()
    })
    return {
        // legend: {
        //     textSize: 11,
        //     formSize: 14,
        //     enabled: false,
        //     form: 'SQUARE',
        //     xEntrySpace: 5,
        //     yEntrySpace: 5,
        //     formToTextSpace: 5,
        //     maxSizePercent: 0.5,
        //     wordWrapEnabled: true,
        // },
        data: {
            dataSets: [
                {
                    values: data.yAxis,
                    label: data.title,
                    config: {
                        drawValues: true,
                        valueFormatter: valueFormatter as string | string[] | undefined,
                        // color: processColor('#006BA6'),
                        color: _.shuffle(
                            ChartColorTheme.NIVO_1.map(color => processColor(color))
                        )[5],
                        barShadowColor: processColor('lightgrey'),
                        highlightAlpha: 0,
                        // highlightColor: processColor('#00000000'),
                    },
                },
            ],
            config: {
                barWidth: 0.8,
            },
        },
        highlights: [],
        drawValueAboveBar: true,
        xAxis: {
            granularity: 1,
            axisMinimum: -1,
            axisLineWidth: 1.5,
            // drawAxisLine: true,
            position: 'BOTTOM',
            drawGridLines: false,
            labelRotationAngle: maxLengthValue <= 4 ? 0 : 45,
            granularityEnabled: true,
            // centerAxisLabels: true,
            valueFormatter: data.xAxis,
            axisMaximum: data.xAxis.length,
            valueFormatterPattern: 'DD/MM/YYYY',
        },
        yAxis: {
            left: {
                axisLineWidth: 1.5,
                // drawAxisLine: true,
                drawGridLines: false,
                granularityEnabled: true,
                valueFormatter: 'largeValue',
                axisMinimum: 0,
            },
            right: {
                enabled: false,
            },
        },
        drawBarShadow: false,
        // drawHighlightArrow: true,
        chartDescription: { text: '' },
        gridBackgroundColor: processColor('transparent'),
        animation: { durationX: 700, durationY: 700, easingY: 'EaseInOutQuart' },
    }
}
