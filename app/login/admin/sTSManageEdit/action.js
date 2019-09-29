import * as da from 'dynamicAction'
import * as api from './api'
import webapi from 'webapi'

let CB

export function initView(initData) {
	return injectFuns => {
        let {getterByField} = da,
            meta = api.getMeta(),
            data = api.getData()
			
		CB = initData.handleEditCb
		
		if(initData) {
			data.form.editValue = initData.keys
			data.form.businessCode = initData.code
			data.form.editExtValue = initData.extKeys
		}
		da.initView( {meta:meta,data:data},exports)(injectFuns)
	}
}

export function changeValue(e) {
	return injectFuns => {
		injectFuns.reduce('changeValue', e)
	}
}

export function clearExtValue() {
	return injectFuns => {
		let businessCode = da.getterByField('form.businessCode')(injectFuns)
		webapi.search.clearExtKeys(injectFuns.post, {businessCode}).then(data => {
			if(!da.handleWebApiInfo(data)(injectFuns))
				return
			da.setMessage({ type: 'success', mode: 'message', content: '清除推荐关键字成功!' })(injectFuns)
			injectFuns.reduce('clearExtValue')
			CB({result: true})
		})
	}
}

export function onOk(cb) {
	return injectFuns => {
		let editValue = da.getterByField('form.editValue')(injectFuns),
			editExtValue1 = da.getterByField('form.editExtValue1')(injectFuns),
			oldValue = '',
			newValue = [],
			formatOldValue
		editValue.map(o => {
			oldValue = oldValue + ' ' + o
		})
		formatOldValue = oldValue.replace(/(^\s*)|(\s*$)/g,'')
		formatOldValue = formatOldValue.replace(/\s+/g, ",")
		formatOldValue.split(',').map(o => {
			newValue.push(o)
		})
		cb({result: true, value: newValue, editExtValue1: editExtValue1})
	}
}

Object.assign(exports, {...da, ...exports})