import * as dr from 'dynamicReducer'

export function radioChange(state,status){
    return dr.setterByField(state, 'status', status)
}
Object.assign(exports,{...dr, ...exports})