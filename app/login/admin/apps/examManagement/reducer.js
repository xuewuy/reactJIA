import * as dr from 'dynamicReducer'
import {fromJS} from 'immutable'
import moment from 'moment'

export function switchModule(state, activeKey) {
    state = dr.setterByField(state, 'activeKey', activeKey)
    return state
}

export function setExamList(state,examList){
    examList.map(item=>{
        item.state = item.state ? '正常' : '关闭' 
    })
    state = dr.setterByField(state,'fieldList',fromJS(examList))
    return state
}

export function setAchievementList(state, achievementList){
    achievementList.map(e=>{
        e.isQualified = e.achievement >= 60 ? '合格' : '不合格'
        e.isCashierQualified = e.cashierAchievement >= 60 ? '合格' : '不合格'
    })
    state = dr.setterByField(state, 'achievementList', fromJS(achievementList))
    return state
}

Object.assign(exports,{...dr, ...exports})