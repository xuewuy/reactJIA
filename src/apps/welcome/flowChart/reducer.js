import * as dr from 'dynamicReducer'
import {fromJS} from 'immutable'

export function btnClick(state,type){
    state = dr.setterByField(state,'from.status',type)
    return state
}


Object.assign(exports, {...dr, ...exports})
