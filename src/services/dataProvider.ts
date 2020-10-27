import axios from 'axios'
import { BASE_API_URL } from '../constants'

/**
 * TODO: Call api
 * @param {string} sourceUrl
 * @param {{ method: 'GET' | 'POST', headers: Headers, filter, params, data}} option
 * @returns {Promise<{error?: any, data?: any}>} return
 */
export const dataProvider = async (
  sourceUrl: string,
  option: {
    method: 'GET' | 'POST',
    headers?: Headers,
    filter?: any,
    params?: any,
    data?: any
  }): Promise<{ error?: any; data?: any }> => {
  try {
    option = option || {}
    const headers = {
      'content-type': 'application/json; charset=utf-8',
      // token: await AsyncStorage.getItem(FILE_USER_ACCESS_TOKEN),
    }
    const method = option.method || 'GET'
    const options = { headers, params: null }
    let filter = ''
    if (option.filter) {
      filter = `?filter=${JSON.stringify(option.filter)}`
    }
    if (option.params) {
      options.params = option.params
    }
    if (method === 'GET') {
      return new Promise((resolve, reject) => {
        axios
          .get(`${BASE_API_URL}${sourceUrl}${filter}`, options)
          .then(response => resolve(response))
          .catch(error => {
            if (error.response) {
              reject(error.response)
            } else {
              reject({ status: 404, error })
            }
          })
      })
    } else {
      const { data } = option
      return new Promise((resolve, reject) => {
        axios
          .post(`${BASE_API_URL}${sourceUrl}`, { data }, options)
          .then(response => resolve(response))
          .catch(error => {
            if (error.response) {
              reject(error.response)
            } else {
              reject({ status: 404, error })
            }
          })
      })
    }
  } catch (err) {
    console.log(err)
    return {
      error: {
        message: err
      }
    }
  }
}
