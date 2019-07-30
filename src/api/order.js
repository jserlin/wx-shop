// 订单相关api
import Request from '@/utils/request'

/**
 * 购物车选中购买的商品跳转到确定订单界面获取商品信息接口
 * @param {String} userToken  用户登录返回的token 可为空 如果没有则跳到登录界面
 * @param {String} ids  选择的购物车id拼接以逗号隔开 11,22,333这种
 * @param {String} addressId  此处从收货地址选中某个回调到确认订单界面需传选中的收货地址id，从购物车进入不需要传空字符串就行
 */
export async function toConfirmOrder(data) {
  const url = '/tShoppingCart/wx/toConfirmOrder'
  return Request.post(url, data)
}

/**
 * 获取支付验证码接口。此接口只有在完全用余额支付的时候调用
 * @param {String} userToken  用户登录返回的token 可为空 如果没有则跳到登录界面
 */
export async function getPayCode(data) {
  const url = '/tOrder/get_pay_code'
  return Request.post(url, data)
}

/**
 * 账户余额支付下单接口
 * 账户余额支付下单接口。余额支付要获取支付验证码，微信支付不需要
 * @param {String} userToken  用户登录返回的token 可为空 如果没有则跳到登录界面
 * @param {String} cartIds  选择的购物车id拼接以逗号隔开 11,22,333这种
 * @param {String} addressId  选择的收货地址id
 * @param {String} payCode  支付验证码
 */
export async function toPayCode(data) {
  const url = '/tOrder/wx/add'
  return Request.post(url, data)
}

/**
 * 微信支付统一下单接口
 * @param {String} userToken  用户登录返回的token 可为空 如果没有则跳到登录界面
 * @param {String} cartIds  选择的购物车id拼接以逗号隔开 11,22,333这种
 * @param {String} addressId  选择的收货地址id
 * @param {String} openid  小程序用户openid
 */
export async function toWxPay(data) {
  const url = '/pay/xcx_generatePrePay'
  return Request.post(url, data)
}
