/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react'
import { Card, View, Spinner } from 'native-base'
import { formatNumber } from '../utils/text-uils'
import { AppText } from './text'
import EStyleSheet from 'react-native-extended-stylesheet'
import { CHART_TYPES, generateTemplate } from './rn-chart-wrapper'
import { callGetKPIData } from '../utils/kpi'
import { strings } from '../config/i18n'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ViewStyle } from 'react-native'

export interface SmartNumberViewProps {
  style: ViewStyle
  chartConfig: {
    name: string
    data: number
    dataComp: number
    isRawData: boolean
  }
  refresh: boolean
}

/**
 * TODO: Create card with smartNumber
 */
export const SmartNumberView = ({
  style,
  chartConfig,
  refresh,
}: SmartNumberViewProps) => {
  const [chart, setChart] = useState({
    name: null,
    data: null,
    dataComp: null,
  })
  const [fetchedData, setFetchedData] = useState(false)
  const [isCombineChart, setIsCombineChart] = useState(false)

  const { name, data, dataComp } = useMemo(() => {
    return chart
      ? chart
      : chartConfig
      ? chartConfig
      : { name: null, data: null, dataComp: null }
  }, [chart, chartConfig])

  const getData = async () => {
    setFetchedData(false)
    let res = []
    try {
      res = await callGetKPIData(chartConfig)
      res = res[0]
      if (res && res.hasOwnProperty('type')) {
        if (res.type !== CHART_TYPES.NUMERIC) {
          res.chart = generateTemplate(res)
        }
        setChart(res)
      }
    } catch (error) {
      console.log('====', error)
      console.log('====', res)
    }
    setFetchedData(true)
  }

  useEffect(() => {
    if (typeof dataComp !== 'number') return
    setIsCombineChart(dataComp >= 0 ? true : false)
  }, [dataComp])

  useEffect(() => {
    if (!fetchedData) {
      getData()
    }
  }, [chartConfig])

  const { width, height } = style

  const rate = useMemo(() => {
    if (isCombineChart && data === dataComp) {
      return 0
    }
    // console.log(isCombineChart, data, dataComp, name)
    return isCombineChart && dataComp != 0
      ? (
          (((data as number) - (dataComp as number)) * 100) /
          (dataComp as number)
        ).toFixed(2)
      : 100
  }, [isCombineChart, data, dataComp])

  const rateStatus = useMemo(
    () => (rate > 0 ? 'INC' : rate < 0 ? 'DESC' : 'EQL'),
    [rate]
  )

  useEffect(() => {
    if (refresh) {
      setChart({ name: chart.name, data: null, dataComp: null })
      getData()
    }
  }, [refresh])

  return (
    <Card style={style}>
      {name ? (
        <View
          style={{
            flex: 1,
            borderRadius: EStyleSheet.value('12rem'),
          }}>
          <View
            style={{
              flex: 2,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <AppText
              numberOfLines={1}
              style={{
                fontSize: ((width as number) + (height as number)) * 0.04,
                color: '#626F82',
                marginLeft: (width as number) * 0.05,
                marginRight: (width as number) * 0.05,
                textAlign: 'center',
              }}>
              {strings(`chartTitles.${name}`)}
            </AppText>
          </View>
          <View
            style={{
              flex: 4,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            {fetchedData ? (
              <AppText
                style={{
                  fontFamily: 'Assistant-Bold',
                  fontSize: ((width as number) + (height as number)) * 0.12,
                  color: '#707070',
                }}>
                {data ? (formatNumber(data) as string).toUpperCase() : 0}
              </AppText>
            ) : (
              <Spinner color="gray" />
            )}
          </View>

          {isCombineChart ? (
            <View
              style={{
                flex: 2,
                flexDirection: 'row',
                paddingBottom: (width as number) * 0.05,
              }}>
              <View
                style={{
                  flex: 2,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: (height as number) * 0.2,
                    height: (height as number) * 0.2,
                    backgroundColor:
                      rateStatus === 'INC'
                        ? 'rgba(204, 238, 227, 0.65)'
                        : rateStatus === 'DESC'
                        ? 'rgba(255, 85, 65, 0.25)'
                        : 'rgba(45, 149, 239, 0.25)',
                    borderRadius: (height as number) * 0.2 * 0.5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon
                    name={
                      rateStatus === 'INC'
                        ? 'arrow-top-right'
                        : rateStatus === 'DESC'
                        ? 'arrow-bottom-right'
                        : 'arrow-right'
                    }
                    style={{
                      color:
                        rateStatus === 'INC'
                          ? '#00B073'
                          : rateStatus === 'DESC'
                          ? '#FE5748'
                          : '#2D95EF',
                      fontSize: ((width as number) + (height as number)) * 0.05,
                    }}
                  />
                  {/* <Icon
                    type="MaterialCommunityIcons"
                    name="arrow-bottom-right"
                    style={{ color: '#FE5748', fontSize: (width + height) * 0.05 }}
                /> */}
                  {/* <Icon
                    type="MaterialCommunityIcons"
                    name="arrow-right"
                    style={{ color: '#2D95EF', fontSize: (width + height) * 0.05 }}
                /> */}
                  {/* <Icon
                    type="FontAwesome5"
                    name="smile"
                    style={{ color: '#00B073', fontSize: (width + height) * 0.05 }}
                /> */}
                  {/* <Icon
                type="FontAwesome5"
                name="meh"
                style={{ color: '#FE5748', fontSize: (width + height) * 0.05 }}
            /> */}
                </View>
              </View>
              <View
                style={{
                  flex: 5,
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  paddingLeft:
                    (width as number) * (rateStatus === 'EQL' ? 0.175 : 0.08),
                }}>
                <AppText
                  style={{
                    fontFamily: 'OpenSans-SemiBold',
                    fontSize: ((width as number) + (height as number)) * 0.065,
                    color:
                      rateStatus === 'INC'
                        ? '#00B073'
                        : rateStatus === 'DESC'
                        ? '#FE5748'
                        : '#2D95EF',
                  }}>
                  {rate >= 0 ? `+${rate}` : rate}%
                </AppText>
              </View>
            </View>
          ) : null}
        </View>
      ) : (
        <Spinner color="gray" style={{ flex: 1, alignSelf: 'center' }} />
      )}
    </Card>
  )
}

// const styles = {
//     textPercent: {
//         // textAlignVertical: 'top',
//         textAlign: 'center',
//     },
//     title: {
//         flex: 1,
//         textAlignVertical: 'top',
//         textAlign: 'center',
//         marginLeft: EStyleSheet.value('16rem'),
//         marginRight: EStyleSheet.value('16rem'),
//         color: '#000',
//         fontFamily: 'OpenSans-Bold',
//     },
//     bigNumber: {
//         fontFamily: 'Assistant-ExtraBold',
//         color: '#000',
//     },
// }
