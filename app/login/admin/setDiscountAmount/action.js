import * as da from 'dynamicAction'
import * as api from './api'
import moment from 'moment'
import webapi from 'webapi'

export function initView(initData){
	return injectFuns =>{
        let {getterByField} = da,
            meta = api.getMeta(),
            data = api.getData()
        data.isLeft = initData.isLeft
        // if(!initData.isLeft&&initData.amount) {
        if(!initData.isLeft) {
            data.isLeft = initData.isLeft
            data.isEdit = initData.isEdit
            data.id = initData.id
            data.rightDiscountAmount.discountPrice = initData.discountPrice===0?'0':initData.discountPrice
        } else if(initData.isLeft&&initData.isEdit) {
            data.isLeft = initData.isLeft
            data.isEdit = initData.isEdit
            data.id = initData.secondLevelId
            data.leftDiscountAmount.smallPrice = initData.smallPrice===0?'0':initData.smallPrice
            data.leftDiscountAmount.commonlyPrice = initData.commonlyPrice===0?'0':initData.commonlyPrice
            data.leftDiscountAmount.name = initData.secondLevelName
            data.leftDiscountAmount.expireTime = initData.expireTime
            
        } else if(initData.isLeft&&!initData.isEdit) {
            data.isLeft = initData.isLeft
            data.isEdit = initData.isEdit
            // data.name = initData.secondLevelName
            data.parentId = initData.firstLevelId
            data.leftDiscountAmount.smallPrice = '0'
            data.leftDiscountAmount.commonlyPrice = '0'
            data.leftDiscountAmount.name = undefined
        }

        da.initView( {meta:meta,data:data},exports)(injectFuns)
            
	}
}

export function onFieldChange(path, oldValue, newValue) {
    return injectFuns => {
        let {initView, setMessage, clearMessage} = da,
            {reduce, post} = injectFuns
        
        da.onFieldChange(path, oldValue, newValue)(injectFuns)
    }
}

export function onOk(cb) {
    return injectFuns => {
        let {validate , getterByField} = da,
            isLeft = getterByField('isLeft')(injectFuns),
            isEdit = getterByField('isEdit')(injectFuns)
        if(!isLeft) {//右侧编辑
            if (!validate('discountAmount.rightDiscountAmount')(injectFuns)) {
                cb({result: false})
                return
            }
            let discountPrice = da.getterByField('rightDiscountAmount.discountPrice')(injectFuns),
                rightId = da.getterByField('id')(injectFuns)
            
            cb({
                result: true,
                params: {
                    'discountPrice': discountPrice-0,
                    'id': rightId
                }
            })
        } else if(isLeft&&isEdit) {//左侧编辑
            if (!validate('discountAmount.leftDiscountAmount')(injectFuns)) {
                cb({result: false})
                return
            }
            let smallPrice = da.getterByField('leftDiscountAmount.smallPrice')(injectFuns),
                commonlyPrice = da.getterByField('leftDiscountAmount.commonlyPrice')(injectFuns),
                name = da.getterByField('leftDiscountAmount.name')(injectFuns),
                expireTime = da.getterByField('leftDiscountAmount.expireTime')(injectFuns),
                id = da.getterByField('id')(injectFuns),
                params = {
                    'smallPrice': smallPrice-0,
                    'commonlyPrice': commonlyPrice-0,
                    'id': id,
                    'name': name,
                    'expireTime':expireTime
                }

            webapi.web.updateAppPrice(injectFuns.post, params).then(data => {
                if (!da.handleWebApiInfo(data)(injectFuns)) {
                    // da.setMessage({
                    //     type: 'warning',
                    //     content: '编辑失败',
                    //     mode: 'message'
                    // })(injectFuns)
                    cb({result: false})
                    return
                }
                cb({
                    result: true,
                    value: params
                })
            })

            // cb({
            //     result: true,
            //     params:{
            //         'smallPrice': smallPrice-0,
            //         'commonlyPrice': commonlyPrice-0,
            //         'id': id,
            //         'name': name
                    
            //     }
            // })
            
        } else if(isLeft&&!isEdit) {//左侧新增暂时用不到
            if (!validate('discountAmount.leftDiscountAmount')(injectFuns)) {
                cb({result: false})
                return
            }
            let smallPrice = da.getterByField('leftDiscountAmount.smallPrice')(injectFuns),
                commonlyPrice = da.getterByField('leftDiscountAmount.commonlyPrice')(injectFuns),
                parentId = da.getterByField('parentId')(injectFuns),
                name = da.getterByField('leftDiscountAmount.name')(injectFuns),
                expireTime = da.getterByField('leftDiscountAmount.expireTime')(injectFuns),
                params = {
                    'smallPrice': smallPrice-0,
                    'commonlyPrice': commonlyPrice-0,
                    'parentId': parentId,
                    'name': name,
                    'expireTime':expireTime
                    
                }
            webapi.web.addAppSon(injectFuns.post, params).then(data => {
                if (!da.handleWebApiInfo(data)(injectFuns)) {
                    // da.setMessage({
                    //     type: 'warning',
                    //     content: '添加失败',
                    //     mode: 'message'
                    // })(injectFuns)
                    cb({result: false})
                    return
                }

                cb({
                    result: true,
                    value: data.value
                })
            })

            // cb({
            //     result: true,
            //     params:{
            //         'smallPrice': smallPrice-0,
            //         'commonlyPrice': commonlyPrice-0,
            //         'parentId': parentId,
            //         'name': name
            //     }
            // })
            
        }

        //先校验
        injectFuns.reduce('onFieldFocus', '') //清空焦点
    }
}

Object.assign(exports, {...da, ...exports})
