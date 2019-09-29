import * as da from 'dynamicAction'
import webapi from 'webapi'
import * as api from './api'

export function initView(initData){
	return async injectFuns =>{
		let provinceList = await webapi.org.getCityMap(injectFuns.post, {}),
			data = api.getData()
		
		if (!da.handleWebApiInfo(provinceList)(injectFuns)){
			return da.initView({ meta: api.meta, data: api.getData() }, exports)(injectFuns)
		}
		da.setMetaProperty(api.meta, 'addExam.formItems.registeredProvincial.dataSource', provinceList.value.provinceList)
		if (initData) {
			data.initData = initData
			data.from.examName = initData.examName
			data.from.registeredProvincial = { code: initData.registeredProvincial }
			data.from.state = { id: initData.state === '正常' ? 1 : 0 }
		}else{
			data = api.getData()
			data.from.registeredProvincial = provinceList.value.provinceList[0]
		}
		da.initView({ meta: api.meta, data: data},exports)(injectFuns)
	}
}
export function onOk(cb){
	return async injectFuns=>{
		injectFuns.reduce('onFieldFocus', '') //清空焦点
		if (!da.validate('addExam')(injectFuns)) return
		let fromObj = da.getterByField('from')(injectFuns),
			params = {
				examName: fromObj.get('examName'),
				registeredProvincial: fromObj.get('registeredProvincial').get('code'),
				state: fromObj.get('state').get('id')
			},
			res = {},
			initData = da.getterByField('initData')(injectFuns)
		if(initData){
			params.examId = initData.get('examId')
			res = await webapi.web.updateExam(injectFuns.post, params)
		}else{
			res = await webapi.web.addExam(injectFuns.post, params)
		}
		cb && cb(res)
	}
}
Object.assign(exports, {...da, ...exports})