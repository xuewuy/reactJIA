import Immutable,{Map} from 'immutable'
import * as da from 'dynamicAction'
import * as api from './api'

export function initView(id) {
    return injectFuns => {
    	da.initView(api.listDemo, exports)(injectFuns)
    }
}

export function btnchange(){
	return injectFuns => {
		let { getterByField, setterByField, setValidate, validate } = da, { post, reduce } = injectFuns
		debugger
		let address = getterByField('address')(injectFuns)
		if (!validate('listDemo.filter')(injectFuns)) 
                return
		console.log(address.toJS())
	}
}


Object.assign(exports, {...da,...exports})
