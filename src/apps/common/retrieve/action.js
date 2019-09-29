import * as da from 'dynamicAction'
import Immutable, { Map } from 'immutable'
import * as api from './api'


/**
 * [初始化视图]
 * @return {[type]} [无返回值]
 */
export function initViewByImmutable(initMeta,initData) {
    return injectFuns => {
        da.initViewByImmutable({ meta:initMeta, data:initData }, exports)(injectFuns)
    }
}

export function onOK(cb){
    return injectFuns =>{
        let { getterByField,validate,setMessage} = da,
            InputGroup = getterByField('from.InputGroup')(injectFuns)
        if(InputGroup && InputGroup.size > 0){
            if(InputGroup.get('rangeStart') > InputGroup.get('rangeEnd')){
                cb({result: false,value:Map()})
                return setMessage({type: 'error', mode: 'message', content: '请输入正确的凭证号'})(injectFuns)
            }
        }
        cb({result: true,value:getterByField()(injectFuns)})
    }
}

Object.assign(exports, {...da, ...exports })
