// 用户相关api
import Request from '@/utils/request'

/**
 * 获取登录短信验证码接口
 * @param {String} username  用户手机号即登录账号
 */
export async function getValidCode(data) {
  const url = '/wxuser/get_valid_code'
  console.log(data)
  try{
    return Request.post(url, data)
  }catch(e){
    console.log(e)
    return {
      data: 'error'
    }
  }
}

/**
 * 获取登录短信验证码接口
 * @param {String} username  用户手机号即登录账号
 * @param {String} valid_code  收到的短信验证码
 */
export async function userLogin(data) {
  const url = '/wxuser/ajax_login'
  return Request.post(url, data)
}

/**
 * 个人中心接口
 * @param {String} username  用户手机号即登录账号
 * @param {String} valid_code  收到的短信验证码
 */
export async function getUserInfo(data) {
  const url = '/wxuser/queryUserInfo'
  return Request.post(url, data)
}
