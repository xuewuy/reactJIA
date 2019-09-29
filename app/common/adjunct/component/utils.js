import webapi from 'webapi'
import * as da from 'dynamicAction'
import {fromJS, Map, List} from 'immutable'
import moment from 'moment'

/**
 * 员工数据源获取
 * @param  {[type]} injectFuns [description]
 * @param  {[type]} onSuccess  [description]
 * @return {[type]}            [description]
 */
export function employeeDataSourceGetter(injectFuns, onSuccess, deptId) {
    let { getterByField, handleWebApiException } = da,
        { post } = injectFuns

    webapi.person.getPersonDeptList(post, undefined).then(data => {
        if (!handleWebApiException(data)(injectFuns)) return
        onSuccess(fromJS(
            data.value.map(o => {
                return {
                    id: o.id,
                    name: o.name + (o.mobile ? `(${o.mobile})` : ''),
                    helpCode: o.helpCode,
                    department: o.department
                }
            })
        ))
    })
}

//项目数据源获取
export function projectDataSourceGetter(injectFuns, onSuccess) {

    let { getterByField, handleWebApiException } = da,
        { post } = injectFuns

    webapi.basicFiles.projectQuery(post, { notNeedPage: true, status: true }).then(ajaxData => {

        if (!da.handleWebApiInfo(ajaxData)(injectFuns)) return
        onSuccess(fromJS(
            ajaxData.value.dataList.map(o => {
                return {
                    id: o.id,
                    name: o.name,
                    code: o.code,
                    helpCode: o.helpCode
                }
            })
        ))
    })
}

export function setValue(ret, propertys, wrappers) {
    if(typeof (propertys) == 'string') {
        return wrappers.hasOwnProperty(propertys) ? wrappers[propertys] : ret
    }
    
    propertys.forEach(p => {
        if(wrappers.hasOwnProperty(p))
            ret = ret.set(p, wrappers[p])
    })
    
    return ret
}