import { baseURL } from './config'

/**
 * 封装接口
 * @param {String} url
 * @param {Object} data 参数
 * @param {Boolean} isLoad 是否显示加载提示框
 * @param {String} method 请求方式
 * @return {Promise}
 */
export const request = (url, data, isLoad = true, method = 'POST') => {
  // 错误提示
  const errToast = err => {
    isLoad && wx.hideLoading()
    wx.showModal({
      title: '温馨提示',
      content: err
    })
  }
  // 获取id
  const getId = () => {
    if (wx.getStorageSync('userInfo')) {
      return JSON.parse(wx.getStorageSync('userInfo')).m
    }
    return ''
  }
  // 拼接参数
  const params = () => {
    if (getId()) {
      return {
        m: getId(),
        ...data
      }
    }
    return data
  }

  return new Promise((resolve, reject) => {
    isLoad && wx.showLoading({ title: '加载中……', mask: true })

    wx.request({
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      url: `${baseURL}${url}`,
      method: method,
      data: params(),
      success(res) {
        if (typeof res.data !== 'object') {
          errToast('服务端异常！')
          reject(res)
        } else if (res.statusCode !== 200) {
          errToast(res.errMsg)
          reject(res)
        }
        resolve(res.data)
      },
      fail(err) {
        if (err.errMsg.includes('timeout')) {
          errToast('请求超时!')
        } else {
          errToast('网络开了小差!')
        }
        reject(err)
      },
      complete() {
        isLoad && wx.hideLoading()
      }
    })
  })
}
