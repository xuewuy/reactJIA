/**
 * Created by lmh on 17/5/31.
 */

/**
 * 立即购买接口
 * @param post
 * @param  "vatTaxpayer":"0",productId = 1000
 * @returns {*}
 */
export function queryOrgList(post, list) {
	return post('/v1/order/queryOrgList', list)
}
/*服务商的接口*/
export function getAllFriend(post, list) {
	return post('/v1/app/getAll', list)
}
/*新增伙伴接口*/
export function createPartner(post, list) {
	return post('/v1/app/createApp', list)
}
/*删除伙伴接口*/
export function deletePartner(post, list) {
	return post('/v1/app/deleteApp', list)
}
/*检验伙伴名称是否存在接口*/
export function checkNameIsExists(post, list) {
	return post('/v1/app/checkNameIsExists', list)
}

export function updatePartner(post, list) {
	return post('/v1/app/updateApp', list)
}
export function getById(post, list) {
	return post('/v1/app/getById', list)
}
export function orderInit(post, list) {
	return post('/v1/order/init', list)
}

//根据手机查企业名称
export function queryOrgListByMobile(post, list) {
	return post('/v1/order/queryOrgListByMobile', list)
}
//根据产品查产品信息
export function productGetById(post, list) {
	return post('/v1/product/getById', list)
}

export function getSPListByApp(post, list) {
	return post('/v1/order/getSPListByApp', list)
}
/**
 *
 * 提交订单
 * @param post
 * @param  "orgId": 2468395544938496,
	   	"productId": 1000,
	   "invoice": {
	            "invoiceType": 200000000000050,
	            "content": "1",
	            "title": "发票抬头",
	            "address": "寄送地址",
	            "contact": "收件人",
	            "mobile": "联系方式",
	        }
	   }
 * @returns {*}
 */
export function create(post, list) {
	return post('/v1/order/create', list)
}
/**
 *
 * 提交订单   Swy
 * @param post
 * @param  "orgId": 2468395544938496,
	   	"productId": 1000,
	   "invoice": {
	            "invoiceType": 200000000000050,
	            "content": "1",
	            "title": "发票抬头",
	            "address": "寄送地址",
	            "contact": "收件人",
	            "mobile": "联系方式",
	        }
	   }
 * @returns {*}
 */
export function createSwy(post, list) {
	return post('/v1/swyorder/createOrder', list)
}

/**
 * 	取消订单
 * @param post
 * @param  "id":"2560484866458624",
    		"payStatus":"2"
 * @returns {*}
 */
export function cancel(post, list) {
	return post('/v1/order/cancel', list)
}

/**
 * 	完成订单
 * @param post
 * @param  "id":"2560484866458624",
    "payType":"1",
    "payStatus":"0"
 * @returns {*}
 */
export function pay(post, list) {
	return post('/v1/order/pay', list)
}

/**
 * 	删除订单
 * @param post
 * @param  "id":"2560484866458624",
 * @returns {*}
 */
export function deleteOrder(post, list) {
	return post('/v1/order/delete', list)
}

/**
 * 	删除订单   Swy
 * @param post
 * @param  "id":"2560484866458624",
 * @returns {*}
 */
export function deleteOrderSwy(post, list) {
	return post('/v1/swyorder/deleteOrder', list)
}
/**
 * 	删除订单前校验
 * @param post
 * @param  "id":"2560484866458624",
 * @returns {*}
 */
export function deleteTest(post, list) {
	return post('/v1/order/deleteTest', list)
}

//更新订单
export function updateOrder(post, list) {
	return post('/v1/order/update', list)
}

//更新订单   Swy
export function updateOrderSwy(post, list) {
	return post('/v1/swyorder/update', list)
}

/**
 * 	我的订单别表&订单管理别表
 * @param post
 * @param   orderType": 0,
	 * "payType":0,
	 * "payStatus":0,
	 * "orgName": 0,
	 * "mobile":0
 * @returns {*}
 */
export function queryOrderList(post, list) {
	return post('/v1/order/queryOrderList', list)
}

/**
 * 	订单管理弹出框
 * @param post
 * @param   id
 * @returns {*}
 */
export function queryOrderDetail(post, list) {
	return post('/v1/order/queryOrderDetail', list)
}

/**
 * 	订单管理弹出框   Swy
 * @param post
 * @param   id
 * @returns {*}
 */
export function queryOrderDetailSwy(post, list) {
	return post('/v1/swyorder/queryOrderDetail', list)
}
/**
 * 	订单管理弹出框保存
 * @param post
 * @param    id=1,
	 * "payType":0,
	 * "payStatus":0
	 * endTime = 1991-01-01,
	 * invoiceStatus = 1,
	 * memo = "asd"
 * @returns {*}
 */
export function updateOrderByAdministrator(post, list) {
	return post('/v1/order/updateOrderByAdministrator', list)
}

/**
 * 	取时间
 * @param post
 * @param    id=1,
	 * "orgId":0,
	 * "payStatus":0
 * @returns {*}
 */
export function changeStatusToDate(post, list) {
	return post('/v1/order/changeStatusToDate', list)
}

/**
 * 	企业管理 创建订单
 * @param post
 * @param    id=1,
	 * "orgId":0,
	 * "payStatus":0
 * @returns {*}
 */
export function getOrgUserById(post, list) {
	return post('/v1/org/getOrgUserById', list)
}

/**
 * 	我的订单 产品购买
 * @param post
 * @param    orgId=1,
 * @returns {*}
 */
export function onlineBuy(post, list) {
	return post('/v1/order/onlineBuy', list)
}
/**
 * 个人代账版	 我的订单 产品购买
 * @param post
 * @param    orgId=1,
 * @returns {*}
 */
export function onlineBuySp(post, json) {
	return post('/v1/spOrder/onlineBuy', json)
}
/**
 * 个人代账版	计算价格
 * @param post
 * @param    orgId=1,
 * @returns {*}
 */
export function countPrice(post, json) {
	return post('/v1/spOrder/countPrice', json)
}
/**
 * 	我的订单 产品购买   Swy
 * @param post
 * @param    orgId=1,
 * @returns {*}
 */
export function onlineBuySwy(post, list) {
	return post('/v1/swyorder/onlineBuy', list)
}

/**
 * 	创建在线订单
 * @param post
 * @param    orgId=1,
 * @param    productId=1,
 * @param    couponCode=1,
 * @param    invoiceStatus=1,
 * @returns {*}
 */
export function createOnlineOrder(post, list) {
	return post('/v1/order/createOnlineOrder', list)
}
/**
 * 	创建在线订单 个人代账
 * @param post
 * @param    orgId=1,
 * @param    productId=1,
 * @param    couponCode=1,
 * @param    invoiceStatus=1,
 * @returns {*}
 */
export function createOnlineSpOrder(post, list) {
	return post('/v1/spOrder/createOnlineOrder', list)
}

/**
 * 	创建在线订单   Swy
 * @param post
 * @param    orgId=1,
 * @param    productId=1,
 * @param    couponCode=1,
 * @param    invoiceStatus=1,
 * @returns {*}
 */
export function createOnlineOrderSwy(post, list) {
	return post('/v1/swyorder/createOnlineOrder', list)
}
/**
 * 	取消在线订单
 * @param post
 * @param    id=1,
 * @param    ts=1,
 * @returns {*}
 */
export function cancelOnlineOrder(post, list) {
	return post('/v1/order/cancelOnlineOrder', list)
}
/**
 * 	取消在线订单 个人代账
 * @param post
 * @param    id=1,
 * @param    ts=1,
 * @returns {*}
 */
export function cancelOnlineOrderSp(post, list) {
	return post('/v1/spOrder/cancelOnlineOrder', list)
}
/**
 * 	取消在线订单   SWY customer
 * @param post
 * @param    id=1,
 * @param    ts=1,
 * @returns {*}
 */
export function cancelOnlineOrderSwy(post, list) {
	return post('/v1/swyorder/cancelOnlineOrder', list)
}
/**
 * 	删除在线订单
 * @param post
 * @param    id=1,
 * @param    ts=1,
 * @returns {*}
 */
export function deleteOnlineOrder(post, list) {
	return post('/v1/order/deleteOnlineOrder', list)
}
/**
 * 	删除在线订单
 * @param post
 * @param    id=1,
 * @param    ts=1,
 * @returns {*}
 */
export function deleteOnlineOrderSwy(post, list) {
	return post('/v1/swyorder/deleteOnlineOrder', list)
}
/**
 * 	查询订单详情
 * @param post
 * @param    id=1,
 * @returns {*}
 */
export function queryOnlineOrderDetail(post, list) {
	return post('/v1/order/queryOnlineOrderDetail', list)
}
/**
 * 	查询订单详情 Sp
 * @param post
 * @param    id=1,
 * @returns {*}
 */
export function queryOnlineSpOrderDetail(post, list) {
	return post('/v1/spOrder/queryOrderDetail', list)
}
/**
 * 	查询我的订单列表
 * @param post
 * @returns {*}
 */
export function queryOnlineOrderList(post, list) {
	return post('/v1/order/queryOnlineOrderList', list)
}
/**
 * 	查询我的订单列表
 * @param post
 * @returns {*}
 */
export function queryOnlineOrderDetailSwy(post, list) {
	return post('/v1/swyorder/queryOnlineOrderDetail', list)
}
/**
 * 	查询我的订单列表   SWY
 * @param post
 * @returns {*}
 */
export function queryOrderListSwy(post, list) {
	return post('/v1/swyorder/queryOrderList', list)
}

/**
 * 	查询我的订单列表   SWY   customer
 * @param post
 * @returns {*}
 */
export function queryOnlineOrderListSwy(post, list) {
	return post('/v1/swyorder/queryOnlineOrderList', list)
}

/**
 * 	获取微信支付码
 * @param post
 * "id":3143770002555904   订单ID
 * @returns {*}
 */
export function getWeixinPayCodeSp(post, list) {
	return post('/v1/spPay/getWeixinPayCode', list)
}
/**
 * 	获取微信支付码 更让人代账
 * @param post
 * "id":3143770002555904   订单ID
 * @returns {*}
 */
export function getWeixinPayCode(post, list) {
	return post('/v1/pay/getWeixinPayCode', list)
}

/**
 * 	获取微信支付码    Swy
 * @param post
 * "id":3143770002555904   订单ID
 * @returns {*}
 */
export function getWeixinPayCodeSwy(post, list) {
	return post('/v1/swypay/getWeixinPayCode', list)
}

/**
 * 	轮询接口
 * @param post
 * "code":"20170906000849262096"   订单号
 * @returns {*}
 */
export function queryPayStatus(post, list) {
	return post('/v1/pay/queryPayStatus', list)
}
/**
 * 	轮询接口 SP
 * @param post
 * "code":"20170906000849262096"   订单号
 * @returns {*}
 */
export function queryPayStatusSp(post, list) {
	return post('/v1/spPay/queryPayStatus', list)
}
/**
 * 	轮询接口   Swy
 * @param post
 * "code":"20170906000849262096"   订单号
 * @returns {*}
 */
export function queryPayStatusSwy(post, list) {
	return post('/v1/swypay/queryPayStatus', list)
}

/**
 * 	通过优惠码获取优惠金额接口
 * @param post
 * "saleCode":‘345354
 * @returns {*}
 */
export function getPriceByCode(post, list) {
	return post('/v1/salecode/getPriceByCode ', list)
}
/**
 * 	获取支付宝二维码信息接口
 * @param post
 * "id":345354
 * @returns {*}
 */
export function getAlipayPayCode(post, list) {
	return post('/v1/pay/getAlipayPayCode', list)
}
/**
 * 	获取支付宝二维码信息接口 个人代账
 * @param post
 * "id":345354
 * @returns {*}
 */
export function getAlipayPayCodeSp(post, list) {
	return post('/v1/spPay/getAlipayPayCode', list)
}
/**
 * 	获取支付宝二维码信息接口    Swy
 * @param post
 * "id":345354
 * @returns {*}
 */
export function getAlipayPayCodeSwy(post, list) {
	return post('/v1/swypay/getAlipayPayCode', list)
}

export function existsUnpaidOrder(post, params) {
	return post('/v1/order/existsUnpaidOrder', params)
}

export function existsUnpaidOrderSwy(post, params) {
	return post('/v1/swyorder/existsUnpaidOrder', params)
}

export function exportOrderList(formPost, list) {
	return formPost('/v1/order/exportOrderList',list)
}

export function exportOrderListSwy(formPost, list) {
	return formPost('/v1/swyorder/exportOrderList',list)
}
/**
新增一个根据手机号查询用户ID的接口(运营的订单管理中新建线下订单时用)        Swy
*/
export function getUserIdByMobile(post, list) {
	return post('/v1/user/getUserIdByMobile',list)
}

/**
立即签署订单
*/
export function contractSave(formPost, option) {
	return formPost('/v1/contract/save',option)
}

/**
合同下载
*/
export function conDownload(formPost, option) {
	return formPost('/v1/contract/download',option)
}

/**
合同查看
*/
export function getImgUrl(formPost, option) {
	return formPost('/v1/contract/getImgUrl',option)
}

/**
 * 工商局注册查询
 * 
*/
export function getByOrgName (formPost, option) {
	return formPost('/v1/contract/getByOrgName',option)
}