/**
 * Created by shenxy on 16/10/9.
 */

import { Map } from 'immutable'

export const propertyOthers        = {id: 200000000000070, name:'其他(含管理)'}
export const propertyProduction    = {id: 200000000000071, name:'与生产相关'}
export const propertySale          = {id: 200000000000072, name:'与销售相关'}
export const propertyPurchase      = {id: 200000000000073, name:'采购'}
export const propertyDevelop       = {id: 200000000000074, name:'与研发相关'}
export const propertyProcessing    = {id: 200000000000075, name:'与加工修理相关'}
export const propertyTechnicalAdvice = { id: 200000000000076, name: '与技术咨询服务相关' }
export const propertyRestaurant = { id: 200000000000077, name:'厨房前厅'}
export const propertyBusiness = { id: 200000000000078, name:'与业务相关'}

export const INDUSTURY_PRODUCE = 1;  //工业行业

//根据部门名称,确定部门属性
export function getPropertyByName(deptName, industry) {
    let keywords = keywordsProduce
    if (industry != INDUSTURY_PRODUCE) {
        keywords = keywordsCommercial
    }
    
    for (let i = 0; i <= deptName.length - keywordLength; i++) {
        let property = keywords.get(deptName.slice(i, i + keywordLength))
        if (property) {
            return property
        }
    }

    return undefined
}

const keywordLength = 2
const keywordsCommercial = Map({
    '管理': propertyOthers,
    '财务': propertyOthers,
    '税务': propertyOthers,
    '财税': propertyOthers,
    '人事': propertyOthers,
    '人力': propertyOthers,   //人力资源
    '行政': propertyOthers,
    '总经': propertyOthers,   //总经办
    '总裁': propertyOthers,   //总裁办
    '经理': propertyOthers,   //总经理
    '办公': propertyOthers,   //办公室
    '后勤': propertyOthers,
    '保卫': propertyOthers,   //保卫处
    '内勤': propertyOthers,
    '外勤': propertyOthers,

    '推广': propertySale,
    '运营': propertySale,
    '销售': propertySale,
    '市场': propertySale,
    '业务': propertySale,
    '售前': propertySale,
    '售后': propertySale,
    '门市': propertySale,
    '营业': propertySale,

    '生产': propertyProduction,
    '制造': propertyProduction,
    '车间': propertyProduction,
    '工厂': propertyProduction,
    // '加工': propertyProduction,

    '采购': propertyPurchase,
    '进货': propertyOthers,
    '购货': propertyOthers,

    '研发': propertyDevelop,
    '开发': propertyDevelop,
    '编程': propertyDevelop,
    '程序': propertyDevelop,

    '加工': propertyProcessing,
    '修理': propertyProcessing,
    '维修': propertyProcessing,

    '前厅': propertyRestaurant,
    '后厨': propertyRestaurant,

    '业务': propertyBusiness,
})

const keywordsProduce = Map({
    '管理': propertyOthers,
    '财务': propertyOthers,
    '税务': propertyOthers,
    '财税': propertyOthers,
    '人事': propertyOthers,
    '人力': propertyOthers,   //人力资源
    '行政': propertyOthers,
    '总经': propertyOthers,   //总经办
    '总裁': propertyOthers,   //总裁办
    '经理': propertyOthers,   //总经理
    '办公': propertyOthers,   //办公室
    '后勤': propertyOthers,
    '保卫': propertyOthers,   //保卫处
    '内勤': propertyOthers,
    '外勤': propertyOthers,

    '生产': propertyProduction,
    '制造': propertyProduction,
    '车间': propertyProduction,
    '工厂': propertyProduction,
    // '加工': propertyProduction,

    '推广': propertySale,
    '运营': propertySale,
    '销售': propertySale,
    '市场': propertySale,
    '业务': propertySale,
    '售前': propertySale,
    '售后': propertySale,
    '门市': propertySale,
    '营业': propertySale,

    '采购': propertyPurchase,
    '进货': propertyOthers,
    '购货': propertyOthers,

    '研发': propertyDevelop,
    '开发': propertyDevelop,
    '编程': propertyDevelop,
    '程序': propertyDevelop,

    '加工': propertyProcessing,
    '修理': propertyProcessing,
    '维修': propertyProcessing,

    '前厅': propertyRestaurant,
    '后厨': propertyRestaurant,
})

// const managementKeywords = ['管理', '财务', '税务', '财税', '人事', '人力资源', '行政', '总经办', '总裁办', '总经理', '办公室', '后勤', '保卫处', '内勤', '外勤']
//
// const productionKeywords = ['生产', '制造', '车间', '工厂', '加工']
//
// const saleKeywords = ['推广', '运营', '销售', '市场', '业务', '售前', '售后', '门市', '营业']
//
// const purchaseKeywords = ['采购', '进货', '购货']
//
// const developKeywords = ['研发', '开发', '编程', '程序']