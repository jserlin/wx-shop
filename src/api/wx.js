import Request from '@/utils/request'

/**
 * 根据code获取授权信息接口
 * @param {String} code 授权code
 */
export async function getSessionKeyOropenid(data) {
  const url = '/wxApplet/getSessionKeyOropenid'
  return Request.post(url, data)
}

/**
 * 获取用户信息授权信息接口
 * @param {String} encryptedData
 * @param {String} sessionKey
 * @param {String} iv
 */
export async function getWxUserInfo(data) {
  const url = '/wxApplet/getUserInfo'
  return Request.post(url, data)
}
