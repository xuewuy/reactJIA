import * as dr from 'dynamicReducer'
import {fromJS} from 'immutable'

export function currentStep(state,value){
	state = dr.setterByField(state,'currentStep',value)
	return state
}
Object.assign(exports, {...dr,...exports})