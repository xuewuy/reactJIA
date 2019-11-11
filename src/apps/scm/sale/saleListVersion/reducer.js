import { fromJS, Map, List } from 'immutable'
import { decorators } from 'dynamicComponent'
import moment from 'moment'
import * as api from './api'
const _r = {...decorators.TabDecorator.reducer, ...decorators.MetaDecorator.reducer}

export function initView(state, payload) {
    let meta = api.getMeta(),
        year = moment().format('YYYY'),
        month = moment().format('MM').toString(),
        yearMonth = moment().format('YYYY-MM'),
        data = {
            list: [],
            pagination:{current: 1, total: 0, pageSize: 20},
            filter: {year, month, yearMonth},
            other: {}
        }

    return _r.initView(state, { meta, data, event:payload.event }, payload.utils)
}

export function load(state, response){
    let parsed = parseResponse(response)
    
    state = _r.setterByField(state, 'list', fromJS(parsed.list))
    state = _r.setterByField(state, 'pagination', fromJS(parsed.pagination))

    if(parsed.filter){
        Object.keys(parsed.filter).forEach(p=>{
            state = _r.setterByField(state, `filter.${p}`, fromJS(parsed.filter[p]))
        })
    }

    if(parsed.other){
        Object.keys(parsed.other).forEach(p=>{
            state = _r.setterByField(state, `other.${p}`, fromJS(parsed.other[p]))
        })
    }
    return state

}

function parseResponse(response) {
    let ret = {
        list: [],
        pagination:{},
        filter: {},
        other: {}
    }

    let responseValue = response.value

    ret.filter = response.filter || {}

    ret.pagination = {
        current:responseValue.page.currentPage,
        pageSize :responseValue.page.pageSize,
        total:responseValue.page.sumCloum
    }

    ret.other = response.other || {}
    ret.other.totalAmount = responseValue.totalAmount.taxInclusiveAmount ? responseValue.totalAmount.taxInclusiveAmount : 0


    if (!responseValue.anList || responseValue.anList.length == 0)
        return ret


    ret.list = responseValue.anList.map(o => {
        return {
            select: false,
            id: o.id,
            code: o.code,
            date: o.updateTime ? moment(o.updateTime).format('YYYY-MM-DD HH:mm:ss') : '',
            docCode: o.docCode,
            docId: o.docId,
            status: o.status,
            workStatus: ((o.status || 0) == 4) ? o.statusName + ',原因:' + o.rebutContext : o.statusName,
            incomeDate: o.inAccountDate ? moment(o.inAccountDate).format('YYYY-MM-DD') : '',
            incomeType: o.paymentsTypeName,
            bizType: o.businessTypeName,
            amount: o.taxInclusiveAmount,
            department: o.departmentName,
            imageNumber: o.picNum,
            creator: o.operatorName,
            year: o.sortYear,
            month: o.sortMonth,
            settleStyleName: o.settleStyleName,
            memo: o.memo,
            auditorName: o.auditorName,
            ts: o.ts,
            sourceVoucherTypeId: o.sourceVoucherTypeId,
            invoiceNo: o.invoiceNo
        }
    })

    return ret
}

Object.assign(exports, {..._r, ...exports })
