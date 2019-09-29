import * as dr from 'dynamicReducer'

export function moreClick(state,id){
    state = dr.setterByField(state,'activeVersionId',id)
    return state
}
Object.assign(exports, {...dr,...exports})
