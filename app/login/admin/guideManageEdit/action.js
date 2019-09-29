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
			data.form.index = initData.index
			data.form.id = initData.id
			data.form.keyWords = initData.keyWords
			data.form.CheckBoxValue = !!initData.isAux ? [initData.isAux+''] : []
		}
		da.initView( {meta:{},data:data},exports)(injectFuns)
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
export function setCheckBoxValue( values){
	return injectFuns=>{
		injectFuns.reduce('setCheckBoxValue',values)
	}
}

export function onOk(cb) {
	return injectFuns => {
		let keyWords = da.getterByField('form.keyWords')(injectFuns),
				check = da.getterByField('form.CheckBoxValue')(injectFuns).toJS()
		cb({result: true, value: {
				keyWords:keyWords,
				checkbox:check
		 }})
	}
}

Object.assign(exports, {...da, ...exports})
