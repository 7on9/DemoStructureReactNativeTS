// import { barChart, createBarChartTemplate } from './barChart'
import { barChart, createBarChartTemplate } from './bar-chart'
import { lineChart, createLineChartTemplate } from './line-chart'
import { pieChart, createPieChartTemplate } from './pie-chart'
import { multipleLineChart } from './multipleLineChart'
import { groupBarChart } from './groupBarChart'
import { strings } from '../../config/i18n'
import { ChartTypes, RNChartDataType, RNChartProps } from './types'
// import { kpi } from '../../utils/kpi'

export const CHART_TYPES = {
    NUMERIC: 'numeric',
    BAR_CHART: 'barChart',
    PIE_CHART: 'pieChart',
    LINE_CHART: 'lineChart',
    MULTIPLE_LINE_CHART: 'multipleLineChart',
    GROUP_BAR_CHART: 'groupBarChart',
}


const charts = {
    barChart,
    pieChart,
    lineChart,
    multipleLineChart,
    groupBarChart,
}

// /**
//  * Draw React-native-chart-wrapper
//  * @param {ChartTypes} type one of chart type
//  * @param {{chartTitle: string, chartIcon: any}} configuration chart configuration
//  * @returns React-native-chart-wrapper
//  */
export const DrawChart = (type: ChartTypes, configuration: RNChartProps) => {
    configuration.chartTitle = strings(`chartTitles.${configuration.chartTitle}`)
    // console.log(configuration.chartTitle)
    return charts[type](configuration)
}

export default {
    BarChart: barChart,
    LineChart: lineChart,
    PieChart: pieChart,
    // MultipleLineChart: multipleLineChart,
}

export const generateTemplate = (data: RNChartDataType) => {
    let chart = {}
    // if (data instanceof Array) {
        // chart = createMultipleLineChartTemplateFromData(data)
        // chart = createGroupBarChartTemplate(data)
        // return chart
    // }
    switch (data.type) {
        case CHART_TYPES.NUMERIC:
            chart = data
            break
        case CHART_TYPES.BAR_CHART:
            chart = createBarChartTemplate(data)
            break
        case CHART_TYPES.PIE_CHART:
            chart = createPieChartTemplate(data)
            break
        case CHART_TYPES.LINE_CHART:
            chart = createLineChartTemplate(data)
            break
        // case CHART_TYPES.MULTIPLE_LINE_CHART:
        default:
            return data
    }
    return chart
}
