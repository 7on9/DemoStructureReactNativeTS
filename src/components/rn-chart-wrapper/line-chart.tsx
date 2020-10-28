/* eslint-disable import/named */
/* eslint-disable react/prop-types */
import React, { FC } from 'react'
import { Text, processColor, View } from 'react-native'
import { Card } from 'native-base'
import { BarValue, LineChart, LineChartProps, } from 'react-native-charts-wrapper'
import { styles } from './styles'
import { formatNumber } from '../../utils/text-uils'
import { RNChartProps } from './types'
// import ChartColorTheme from '../colorTheme'

export const lineChart: FC<RNChartProps> = ({ chartStyle, containerStyle, chartConfig, chartTitle }: RNChartProps) => {
    return !chartConfig ? null : (
        <Card style={containerStyle}>
            <View style={styles.headerContainer}>
                <Text
                    style={[
                        styles.headerText,
                        { fontSize: containerStyle.height * styles.headerText.fontSize, }
                    ]}>
                    {chartTitle}
                </Text>
            </View>
            <LineChart
                {...chartConfig as LineChartProps}
                style={[
                    chartStyle,
                    {
                        flex: 4.25,
                        width: '100%',
                        // height: '50%',
                        // maxWidth: containerStyle.width * 0.75,
                        alignSelf: 'center',
                    }]}
            // onSelect={this.handleSelect.bind(this)}
            // highlights={this.state.highlights}
            // onChange={event => console.log(event.nativeEvent)}
            />
        </Card>
    )
}

export const createLineChartTemplate = (data: { yAxis: Array<BarValue>, xAxis: string[], title: string }) => {
    const valueFormatter = data.yAxis.map((item) => {
        // min = item.y < min ? item.y : min
        if (!item.y) {
            item.y = 0
        }
        return formatNumber(item.y)
    })

    // data.values = data && data.values ? data.values.map(val => val.x && val.y) : []

    let maxLengthValue = -Infinity
    // let isHourLabel = data.title.toLowerCase().indexOf('giờ') >= 0
    data.xAxis = data.xAxis.map(time => {
        // time = isHourLabel
        //     ? (parseInt(time) + new Date().getTimezoneOffset() / -60).toString()
        //     : time
        maxLengthValue = maxLengthValue < time.length ? time.length : maxLengthValue
        return time
    })

    return {
        data: {
            dataSets: [
                {
                    values: data.yAxis,
                    // values: [...data.values],
                    label: data.title,
                    config: {
                        // highlightLineWidth: 1,
                        valueFormatter,
                        drawValues: true,
                        highlightAlpha: 90,
                        // mode: 'CUBIC_BEZIER',
                        color: processColor('#8CEAFF'),
                        highlightColor: processColor('transparent'),
                        barShadowColor: processColor('transparent'),
                        lineWidth: 1.5,
                        drawFilled: true,
                        fillColor: processColor('rgba(140, 234, 255, 0.4)'),
                        // fillGradient: {
                        //     colors: [processColor('red'), processColor('blue')],
                        //     // iOS
                        //     positions: [0, 1],
                        //     angle: 90,
                        //     // Android
                        //     orientation: 'TOP_BOTTOM',
                        // },
                        fillAlpha: 18000,
                    },
                },
            ],
        },
        chartDescription: { text: '' },
        animation: {
            durationX: 700,
            durationY: 700,
            easingY: 'EaseInOutQuart',
        },
        legend: { enabled: false },
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
            labelRotationAngle: maxLengthValue <= 4 ? 0 : 45,
            granularityEnabled: true,
            // centerAxisLabels: true,
            valueFormatter: data.xAxis,
            axisMaximum: data.xAxis.length,
            // valueFormatterPattern: 'DD/MM/YYYY',
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
        // dragDecelerationFrictionCoef: 0.99,
        keepPositionOnRotation: false,
    }
}
