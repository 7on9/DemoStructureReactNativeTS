import { Dimensions, Platform, StatusBar } from 'react-native'

export class UIConstants {
    static AppbarHeight = Platform.OS === 'ios' ? 44 : 56
    static StatusbarHeight = Platform.OS === 'ios' ? 20 : 0
    static HeaderHeight = UIConstants.AppbarHeight + UIConstants.StatusbarHeight
}

export const APP_SIZES = {
    widthWindow: Dimensions.get('window').width,
    heightWindow: Dimensions.get('window').height,
    widthScreen: Dimensions.get('screen').width,
    heightScreen: Dimensions.get('window').height,
    statusBarHeight: Platform.select({ ios: 30, android: StatusBar.currentHeight }),
    appBarHeight: Platform.select({ ios: 44, android: 56 }),
}

export const APP_AVG_SIZE = (APP_SIZES.widthWindow + APP_SIZES.heightWindow) / 2.0
export const APP_HW_RATIO = (APP_SIZES.heightWindow + APP_SIZES.widthWindow) / 100.0
export const APP_WH_RATIO = (APP_SIZES.widthWindow + APP_SIZES.heightWindow) / 100.0

/* -----------------BUILD_CONFIG-------------------- */
export const BUILD_TYPE_DEBUG = 'BUILD_TYPE_DEBUG'
export const BUILD_TYPE_RELEASE = 'BUILD_TYPE_RELEASE'

/**
 * (Un)Comment for build type
 */
// export const BUILD_TYPE = 'BUILD_TYPE_LOCAL'
// export const BUILD_TYPE = BUILD_TYPE_RELEASE
export const BUILD_TYPE = BUILD_TYPE_DEBUG

let _BASE_API_URL = ''

if ((BUILD_TYPE as string) === BUILD_TYPE_RELEASE) {
    _BASE_API_URL = 'http://localhost:3000/api'
} else if (BUILD_TYPE === BUILD_TYPE_DEBUG) {
    _BASE_API_URL = 'http://0.0.0.0:3000/api'
} else {
    // _BASE_API_URL = 'http://localhost:3000/api'
    _BASE_API_URL = 'http://10.198.41.100:3000/api'
}

export const BASE_API_URL = _BASE_API_URL

export const MOMENT_TIME = {
    day: {
        name: 'day',
        granularity: 'days',
        iso: 'day',
    },
    week: {
        name: 'week',
        granularity: 'weeks',
        iso: 'isoWeek',
    },
    month: {
        name: 'month',
        granularity: 'months',
        iso: 'month',
    },
    quarter: {
        name: 'quarter',
        granularity: 'quarters',
        iso: 'quarter',
    },
    year: {
        name: 'year',
        granularity: 'years',
        iso: 'Year',
    },
}

export const FILE_USER_ACCESS_TOKEN = 'USER_ACCESS_TOKEN'
export const FILE_USER_DATA = 'NEXBUS_USER_DATA'
export const FILE_LOCALE = 'NEXBUS_LOCALE'

export const APP_COLORS = {
    main: '#3cb54b',
    text: {
        header: '#37393A',
        dark: '#454F63',
        normal: '#78849E',
    },
    background: '#F7F7FA',
}

export const LOCALE_CALENDAR_VN = {
    monthNames: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
    ],
    monthNamesShort: [
        'Th1',
        'Th2',
        'Th3',
        'Th4',
        'Th5',
        'Th6',
        'Th7',
        'Th8',
        'Th9',
        'Th10',
        'Th11',
        'Th12',
    ],
    dayNames: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'],
    dayNamesShort: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
}

export const DEFAULT_DATE_FORMAT = {
    VN: 'DD/MM/YYYY',
    EN: 'MM/DD/YYYY',
}

export const LOCALE_CALENDAR_EN = {
    monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'Augst',
        'September',
        'October',
        'November',
        'December',
    ],
    monthNamesShort: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
    ],
    dayNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    dayNamesShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
}