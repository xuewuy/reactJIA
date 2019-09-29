import metaDecorator from '../metaDecorator'
import tabDecorator from '../tabDecorator'
const ma = metaDecorator.action
const ta = tabDecorator.action


export function refresh(option){
	return async injectFuns=>{
		let pagination = ma.getterByField('pagination')(injectFuns).toJS(),
        	filter = ma.getterByField('filter')(injectFuns).toJS(),
        	api = option.api

        let response = await ma.query( api, injectFuns.post, pagination, filter)(injectFuns)

        injectFuns.reduce('refresh', response)		
	}
}

Object.assign(exports, {...ta, ...ma,  ...exports })