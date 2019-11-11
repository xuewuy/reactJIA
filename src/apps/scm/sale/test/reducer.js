import * as dr from 'dynamicReducer'
import { fromJS, Map, List } from 'immutable'
import * as api from './api'
import * as action from './action'

export function initView(state, payload, utils) {
    state = dr.initView(state, payload, utils)

    return state
}