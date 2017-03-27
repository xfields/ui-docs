import axios from 'axios'

const encode = window.encodeURIComponent
const toString = Object.prototype.toString
const addParam = (url, params) => {
  let arr = Object.keys(params).map(key => encode(key) + '=' + encode(params[key])).join('&')

  if (!arr) {
    return url
  }

  return url + (url.indexOf('?') !== -1 ? '&' : '?') + arr
}

/**
 * Ajax Request, based on axios
 *
 * @class Request
 */
export default class Request {
  constructor(origin, ver, endpoint, cache = false) {
    this._origin = origin
    this._ver = ver
    this._endpoint = endpoint
    this._cache = cache
  }

  assembleUrl(options) {
    const { _origin, _ver, _endpoint, _uriVars, _params } = this
    let { uri, params, uriVars } = options
    let url = [_origin, _ver, _endpoint]

    params = {..._params, ...params}
    uriVars = {..._uriVars, ...uriVars}

    // uri: id | null | undefined
    if (uri || uri === 0) {
      url = url.concat(uri)
    }

    url = url.join('/')

    if (params) {
      url = addParam(url, params)
    }

    if (!this.cache) {
      // waf doesn't support cors Cache-Control header currently
      // would be removed after waf updated
      url = addParam(url, {
        _: new Date().getTime()
      })
    }

    // 替换 URL 中的变量，如 {xxx}
    if (uriVars) {
      Object.keys(uriVars).forEach(function (key) {
        url = url.replace(new RegExp('{' + key + '}', 'img'), encode(uriVars[key]))
      })
    }

    delete options.uri
    delete options.uriVars
    delete options.params

    return url
  }

  buildData(data) {
    const { _data } = this

    if (!data) return _data

    switch (toString.call(data)) {
      case '[object Array]':
        return [..._data, ...data]
      case '[object Object]':
        return {..._data, ...data}
      default:
        return data
    }
  }

  /**
   * 参数 options 说明
   *
   * {number|string|array} uri    资源 ID, 可以是数组
   * {object} replacement         用于替换 url 中的变量, 如 {uri}
   *
   * {object} params              the URL parameters to be sent with the request
   * {object} data                the data to be sent as the request body
   * @see {@link https://github.com/mzabriskie/axios} for more options
   *
   */
  request(options) {
    const url = this.assembleUrl(options)

    options.headers = options.headers || {}
    options.data = this.buildData(options.data)

    return axios({
      url: url,
      responseType: 'text',
      ...options
    })
  }
}
