import Immutable, { fromJS } from 'immutable'
import * as da from 'dynamicAction'




export function initView() {
    return injectFuns => {
    	da.initView({}, exports)(injectFuns)
    }
}

Object.assign(exports, {...da, ...exports })