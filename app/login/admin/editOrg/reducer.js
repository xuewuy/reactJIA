import * as dr from 'dynamicReducer'

export function setDzList(state,visible){
    state = dr.setter(state,'editOrg.fromItems.dzList','visible',visible)
    // state = dr.setter(state,'editOrg.fromItems.dzRules','visible',visible)
    return state
}

export function setCurrOrgCunt(state){
    return dr.setterByField(state,'currOrgCount',dr.getterByField(state,'form.dzList.availableOrgCount'))
}
Object.assign(exports,{...dr, ...exports})