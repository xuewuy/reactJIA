import * as da from 'dynamicAction'
import * as api from './api'
import webapi from 'webapi'

export function initView(initData){
	return injectFuns =>{
        let appList = null,productList = null
        /**
         * 获取伙伴名称下拉列表数据
         */
        webapi.app.getAll(injectFuns.post,{}).then(data=>{
            if(!da.handleWebApiInfo(data)(injectFuns)) return
            appList = data.value
            da.setMetaProperty(api.meta, 'addPromoCode.fromItems.appName.dataSource', data.value)
            return webapi.salecode.queryProduct(injectFuns.post)
            /*
             * 获取产品名称下拉列表数据
             */
        }).then(data=>{
            if(!da.handleWebApiInfo(data)(injectFuns)) return
            productList = data.value
            da.setMetaProperty(api.meta, 'addPromoCode.fromItems.productName.dataSource', data.value)
            // 如果是修改伙伴价格，伙伴名称和产品名称为不可选
            da.setMetaProperty(api.meta, 'addPromoCode.fromItems.appName.disabled', !!initData)
            da.setMetaProperty(api.meta, 'addPromoCode.fromItems.productName.disabled', !!initData)
            if(initData){//根据是修改或者新增去调用不同的接口拿数据
                /*
                 * 此处为修改伙伴价格，需要根据当前的伙伴价格ID去获取最新的伙伴价格信息
                 */
                return webapi.salecode.queryById(injectFuns.post,initData.id)
            }else{
                /*
                 * 此处为新增，新增时获取后台生成的唯一优惠码
                 */
                return webapi.salecode.getSalecode(injectFuns.post,{appId:appList[0].id})
            }
        }).then(data=>{
            if(!da.handleWebApiInfo(data)(injectFuns)) return
            let product = data.value.productId ? productList.find(e=>e.id == data.value.productId) : productList[0]
            api.data.form.productName = product
            api.data.form.productPrice = product.price
            api.data.form.promotionPrice = product.promotionPrice
            api.data.initData = initData
            api.data.form.saleCode = initData ? data.value.saleCode : data.value
            api.data.form.salePrice = initData ? data.value.salePrice : ''
            api.data.form.appName = initData ? appList.find(app=>app.id==initData.appId) : appList[0]
            api.data.form.ts = initData ? data.value.ts : ''
            api.data.form.id = initData ? data.value.id : ''
            da.initView( {meta:api.meta,data:api.data},exports)(injectFuns)
        })
        
	}
}

/**
 * [onOk 新增和保存按钮事件]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
export function onOk(callback) {
    return injectFuns=> {
        let fromData = da.getterByField('form')(injectFuns).toJS(),
            initData = da.getterByField('initData')(injectFuns),
            objData = {
                "appId":fromData.appName.id,
                "productId":fromData.productName.id,
                "saleCode":fromData.saleCode,
                "salePrice":fromData.salePrice
            }
        injectFuns.reduce('onFieldFocus', '') //清空焦点
        if (!da.validate('addPromoCode')(injectFuns)) return
        /*
         *  initDdata判断是修改或者新增去调用不同的接口
         */
        if(fromData.salePrice >= fromData.promotionPrice){
            return da.setValidate('addPromoCode.fromItems.salePrice','伙伴价格应该大于0小于推广价格')(injectFuns)
        }
        if(initData){
            objData.ts = fromData.ts
            objData.id = fromData.id
            webapi.salecode.updateSalecode(injectFuns.post,objData).then(data=>{
                if(!da.handleWebApiInfo(data)(injectFuns)) return
                callback(data)
            })
        }else{
            webapi.salecode.insertSalecode(injectFuns.post,objData).then(data=>{
                if(!da.handleWebApiInfo(data)(injectFuns)) return
                callback(data)
            })
        }
        
        
    }
}

export function onFieldChange(path, oldValue, newValue) {
    return injectFuns => {
        injectFuns.reduce('onFieldFocus', '')
        da.onFieldChange(path, oldValue, newValue)(injectFuns)
        if(path === 'addPromoCode.fromItems.saleCode'){
            /**
             * 监听优惠码发生更改，把所有的小写字母强制转换为大写
             */
            injectFuns.reduce('setSaleCode',newValue)
        }else if(path === 'addPromoCode.fromItems.appName'){
            webapi.salecode.getSalecode(injectFuns.post,{appId:newValue.get('id')}).then(data=>{
                if(!da.handleWebApiInfo(data)(injectFuns)) return
                injectFuns.reduce('setSaleCode',data.value)
            })
        }else if(path === 'addPromoCode.fromItems.productName'){
            injectFuns.reduce('setProductPrice',newValue)
        }
    }
}

Object.assign(exports, {...da, ...exports})
