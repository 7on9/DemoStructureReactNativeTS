/* eslint-disable import/named */
import React, { FC } from 'react'
import { Text, processColor } from 'react-native'
import { Card, View } from 'native-base'
import { PieChart, PieChartProps, PieDataset, PieValue } from 'react-native-charts-wrapper'
import { styles } from './styles'
import _ from 'lodash'
import { ChartColorTheme } from '../colorTheme'
import EStyleSheet from 'react-native-extended-stylesheet'
import { strings } from '../../config/i18n'
import { RNChartProps } from './types'

/**
 * Return card contain pie-chart
 * @param {*} id key Of element
 * @param {*} chartStyle style of chart (view props)
 * @param {*} containerStyle card configuration
 * @param {*} chartConfig chart template
 * @param {*} chartTitle title of chart
 * @param {*} event events handlers
 */
export const pieChart: FC<RNChartProps> = ({ chartStyle, containerStyle, chartConfig, chartTitle, event }: RNChartProps) => {
    return !chartConfig ? null : (
        <Card style={containerStyle}>
            <View style={styles.headerContainer}>
                <Text
                    style={{
                        ...styles.headerText,
                        fontSize: containerStyle.height * styles.headerText.fontSize,
                    }}>
                    {chartTitle}
                </Text>
            </View>
            <PieChart
                {...chartConfig as PieChartProps}
                style={[
                    chartStyle,
                    {
                        flex: 4.25,
                        width: '100%',
                        marginBottom: EStyleSheet.value('12rem'),
                        alignSelf: 'center',
                    }
                ]}
                holeRadius={containerStyle.width * 0.125}
                transparentCircleRadius={containerStyle.width * 0.125 + 15}
                {...event}
            // onSelect={this.handleSelect.bind(this)}
            // highlights={this.state.highlights}
            // onChange={event => console.log(event.nativeEvent)}
            />
        </Card>
    )
}

export const createPieChartTemplate = (data: PieDataset) => {
    // let valueFormatter = data.yAxis.map(item => formatNumber(item.y))
    if (data.values) {
        data.values = (data.values as PieValue[]).filter(val => val.label && val.value)
        data.values = (data.values as PieValue[]).map(item => {
            // time = isHourLabel
            //     ? (parseInt(time) + new Date().getTimezoneOffset() / -60).toString()
            //     : time
            let label = strings(`chartLabels.${(item.label || '').trim()}`)
            label = label.charAt(0) === '[' ? item.label : label
            // maxLengthValue = maxLengthValue < time.length ? time.length : maxLengthValue
            return { ...item, label } //.toString()
        })
    }
    return {
        legend: {
            textSize: EStyleSheet.value('9rem'),
            enabled: true, //false
            form: 'CIRCLE',
            // xEntrySpace: 5,
            // yEntrySpace: 5,
            // formToTextSpace: 5,
            // color: '#000',
            fontFamily: 'OpenSans-Regular',
            wordWrapEnabled: true,
            orientation: 'HORIZONTAL',
            verticalAlignment: 'BOTTOM',
            horizontalAlignment: 'CENTER',
        },
        data: {
            dataSets: [
                {
                    values: data.values || {},
                    label: '',
                    config: {
                        // colors: _.shuffle([
                        //     processColor('#C0FF8C'),
                        //     processColor('#FFF78C'),
                        //     processColor('#FFD08C'),
                        //     processColor('#8CEAFF'),
                        //     processColor('#FF8C9D'),
                        // ]),
                        colors: _.shuffle(ChartColorTheme.NIVO_2.map(color => processColor(color))),
                        sliceSpace: 2,
                        valueTextSize: EStyleSheet.value('10rem'),
                        textSize: EStyleSheet.value('10rem'),
                        selectionShift: EStyleSheet.value('10rem'),
                        valueFormatter: "#.#'%'",
                        valueLinePart1Length: EStyleSheet.value('0.5rem'),
                        fontFamily: 'OpenSans-Regular',
                        xValuePosition: 'OUTSIDE_SLICE',
                        yValuePosition: 'OUTSIDE_SLICE',
                        // xValuePosition: 'INSIDE_SLICE',
                        // yValuePosition: 'INSIDE_SLICE',
                        valueTextColor: processColor('gray'),
                        valueLineColor: processColor('green'),
                    },
                },
            ],
        },
        highlights: [],
        chartDescription: { text: '' },
        // chartDescription: {
        //     text: 'This is Pie chart description',
        //     textSize: 15,
        //     textColor: processColor('darkgray'),
        // },
        animation: { durationX: 700, durationY: 700 },
        centerTextRadiusPercent: 100,
        chartBackgroundColor: processColor('white'),
        drawEntryLabels: false,
        entryLabelColor: processColor('gray'),
        entryLabelTextSize: EStyleSheet.value('10rem'),
        fontFamily: 'OpenSans-Regular',
        holeColor: processColor('#f0f0f0'),
        // holeRadius: 30,
        // transparentCircleRadius: 55,
        maxAngle: 360,
        rotationAngle: 0,
        rotationEnabled: true,
        styledCenterText: {
            text: '',
            color: processColor('white'),
            size: EStyleSheet.value('20rem'),
        },
        transparentCircleColor: processColor('#f0f0f088'),
        usePercentValues: true,
    }
}
