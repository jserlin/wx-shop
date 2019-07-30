// 商品相关api
import Request from '@/utils/request'

/**
 * 首页banner接口
 */
export async function getBannerLists(data) {
  const url = '/tBanner/queryList'
  return Request.post(url, data)
}

/**
 * 首页福利商品接口
 * @param {Number} welfare  固定为1
 * @param {Number} page
 * @param {String} userToken
 */
export async function getIndexWelfareList(data) {
  const url = '/wxindex/ajax_list'
  return Request.post(url, data)
}

/**
 * 首页商品列表接口  详见接口文档 5.2
 * @param {Number} welfare  固定为1
 * @param {Number} page
 * @param {String} userToken
 * @param {String} goodsType 写死 0
 */
export async function getIndexList(data) {
  const url = '/wxindex/goods_list'
  return Request.post(url, data)
}

/**
 * 商品详情接口
 * @param {String} id  商品id
 * @param {*} userToken
 */
export async function getProductDetail(data) {
  const url = '/wxindex/ajax_goods_detail'
  return Request.post(url, data)
}

/**
 * 购物车列表接口
 * @param {String} userToken  用户登录返回的token 可为空 如果没有则跳到登录界面
 */
export async function getShoppingCartLists(data) {
  const url = '/tShoppingCart/wx/query'
  return Request.post(url, data)
}

/**
 * 加入购物车接口
 * @param {String} goodsId  商品id
 * @param {String} userToken  用户登录返回的token 可为空 如果没有则跳到登录界面
 * @param {String} skuId  商品skuId传选中的那一个
 * @param {Number} goodsType  获取返回的商品对象中对应的值传入就行
 */
export async function addShoppingCart(data) {
  const url = '/tShoppingCart/wx/add'
  return Request.post(url, data)
}

/**
 * 购物车选中商品到确定下单界面前需做校验，校验返回成功则说明选中的商品可以一单购买，
 * 如果不成功会返回不成功原因前端只需要提示出来就行，不成功的继续停留在当前购物车界面
 * @param {String} userToken  用户登录返回的token 可为空 如果没有则跳到登录界面
 * @param {String} ids  选择的购物车id拼接以逗号隔开 11,22,333这种
 */
export async function checkShoppingCartLists(data) {
  const url = '/tShoppingCart/wx/isPay'
  return Request.post(url, data)
}

/**
 * 商品分类列表接口
 * @param {String} userToken  用户登录返回的token 可为空
 * @param {String} categoryPid  为0展示一级菜单 传一级菜单获取二级菜单列表 此处的值传categoryId的值
 */
export async function getCategoryLists(data) {
  const url = '/tCategory/wx/query'
  return Request.post(url, data)
}

