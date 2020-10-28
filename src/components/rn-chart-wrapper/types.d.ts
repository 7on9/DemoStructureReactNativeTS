/* eslint-disable import/named */
import { StyleProp, ViewStyle } from 'react-native'
import {
    BarChartProps,
    LineChartProps,
    PieChartProps,
    PieDataset,
} from 'react-native-charts-wrapper'

export interface RNChartProps {
    chartStyle: StyleProp<ViewStyle>
    containerStyle: {
        height: number
        width: number
    }
    chartConfig?: BarChartProps | PieChartProps | LineChartProps
    chartTitle: string
    event?: {
        onClick?: () => any
    }
}

export enum ChartTypes {
    NUMERIC = 'numeric',
    BAR_CHART = 'barChart',
    PIE_CHART = 'pieChart',
    LINE_CHART = 'lineChart',
    MULTIPLE_LINE_CHART = 'multipleLineChart',
    GROUP_BAR_CHART = 'groupBarChart',
}

export interface RNChartDataType extends PieDataset { 
    type: ChartTypes, 
    xAxis: any, 
    yAxis: any, 
    title: string 
}