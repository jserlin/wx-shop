// 用户相关api
import Request from '@/utils/request'

/**
 * 获取登录短信验证码接口 ✅
 * @param {String} username  用户手机号即登录账号
 */
export async function getValidCode(data) {
  const url = '/wxuser/get_valid_code'
  try {
    return Request.post(url, data)
  } catch (e) {
    console.log(e)
    return {
      data: 'error'
    }
  }
}

/**
 * 获取登录短信验证码接口 ✅
 * @param {String} username  用户手机号即登录账号
 * @param {String} valid_code  收到的短信验证码
 */
export async function userLogin(data) {
  const url = '/wxuser/ajax_login'
  return Request.post(url, data)
}

/**
 * 个人中心接口 ✅
 * @param {String} userToken  用户token
 */
export async function getUserInfo(data) {
  const url = '/wxuser/queryUserInfo'
  return Request.post(url, data)
}

/**
 * 个人中心－订单列表 ✅
 * @param {String} orderStatus 订单状态 1已取消 2待发货 3待收货 不传为全部
 * @param {String} page 当前页数
 */
export async function getMyCenterOrder(data) {
  const url = '/tOrder/wx/query'
  return Request.post(url, data)
}

/**
 * 个人中心－取消订单 ✅
 * @param {String} orderCode
 */
export async function cancelOrderByOrders(data) {
  const url = '/tOrder/wx/cancelOrder'
  return Request.post(url, data)
}

/**
 * 个人中心－订单详情 ✅
 * @param {String} orderCode
 */
export async function getOrderInfo(data) {
  const url = '/tOrder/wx/orderDetail'
  return Request.post(url, data)
}

/**
 * 个人中心－订单商品申请退货 ✅
 * @param {String} orderCode
 * @param {String} skuId 单个商品id
 */
export async function getReturnofGoods(data) {
  const url = '/tOrderDetail/wx/queryById'
  return Request.post(url, data)
}

/**
 * 个人中心－提交申请退货 ✅
 * @param {String} orderCode
 * @param {String} skuId
 * @param {String} reason 退货类型
 * @param {String} reasonDesc 退货描述
 */
export async function postReturnOfGoods(data) {
  const url = '/tOrder/wx/returnOrder'
  return Request.post(url, data)
}

/**
 * 个人中心－售后退货列表 ✅
 * @param {String} returnStatus 退货订单状态 0为全部 3为待退货 2为已取消 5为已拒绝 7为已完成
 */
export async function getReturnofGoodList(data) {
  const url = 'tOrderDetail/wx/query'
  return Request.post(url, data)
}

/**
 * 个人中心－取消申请退货 ✅
 * @param {String} returnApplyId 退货订单编号
 */
export async function cancelReturnOfGoods(data) {
  const url = '/tOrder/wx/cancelReturnOrder'
  return Request.post(url, data)
}

/**
 * 个人中心－申请退货详情 ✅
 * @param {String} returnApplyId 退货订单编号
 */
export async function getReturnofGoodInfo(data) {
  const url = '/tOrderDetail/wx/queryByReturnApplyId'
  return Request.post(url, data)
}

/**
 * 个人中心－退货详情物流信息 ✅
 * @param {String} returnApplyId 退货订单编号
 * @param {String} trackingCompany 物流公司id
 * @param {String} trackingNum 物流单号
 */
export async function bindReturnOfGoodExpress(data) {
  const url = 'tOrder/wx/offerOrderExpress'
  return Request.post(url, data)
}

/**
 * 个人中心－收货地址 ✅
 */
export async function getUserAddress(data) {
  const url = '/tAddress/wx/query'
  return Request.post(url, data)
}

/**
 * 个人中心－删除收货地址 ✅
 * @param {String} ids 地址id
 */
export async function deleteUserAddress(data) {
  const url = '/tAddress/wx/delete'
  return Request.post(url, data)
}

/**
 * 个人中心－设置默认收货地址 ✅
 * @param {String} ids 地址id
 */
export async function setUserAddressDefault(data) {
  const url = '/tAddress/wx/updateDefault'
  return Request.post(url, data)
}

/**
 * 个人中心－单个收货地址查询接口
 * @param {String} id 地址id
 */
export async function singleAddressInfo(data) {
  const url = '/tAddress/wx/queryById'
  return Request.post(url, data)
}

/* ✅ */
export async function addNewAddress(data){
  const url = '/tAddress/wx/add'
  return Request.post(url, data)
}

/**
 * trueName
 * addressTel
 * address
 * provinceId
 * province
 * cityId
 * city
 * areaId
 * area
 * isDefault
 * id
 */
export async function editNewAddress(data){
  const url = '/tAddress/wx/update'
  return Request.post(url, data)
}

/**
 * orderCode 订单详情物流 ✅
 */
export async function getOrderExpress(data){
  const url = '/tOrder/wx/queryExpress'
  return Request.post(url, data)
}

// ✅
export async function getAddressAll(){
  const url = '/src/style/area.json'
  return Request.get(url)
}

export async function confirmOrder(data){
  const url = '/tOrder/wx/confirmOrder'
  return Request.post(url, data)
}


/**
 * 账单
 * @param {String} userToken
 * @param {Number} page
 */
export async function billList(data){
  const url = '/tUserRecharge/wx/query'
  return Request.post(url, data)
}