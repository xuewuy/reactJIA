import * as dr from 'dynamicReducer'
import { fromJS, Map, List } from 'immutable'

export function setAddressee(state,addressee){
    return dr.setterByField(state,'addressee',addressee)
}
export function setCopyTo(state,copyTo){
    return dr.setterByField(state,'copyTo',copyTo)
}
export function setSubject(state,subject){
    return dr.setterByField(state,'subject',subject)
}


Object.assign(exports, {...dr,...exports})
