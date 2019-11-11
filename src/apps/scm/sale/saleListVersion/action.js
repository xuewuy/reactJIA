import React from 'react'
import Immutable, { fromJS } from 'immutable'
import { decorators } from 'dynamicComponent'
import moment from 'moment'
import * as api from './api'
import webapi from 'webapi'
import * as consts from './consts'
const _a = {...decorators.TabDecorator.action, ...decorators.MetaDecorator.action}

var _i, _com

const event = {
    'root': {
        onLoad: load
    },
    'root.header.headerLeft.yearMonth': {
        onChange: yearMonthChange
    },
    'root.header.headerLeft.refresh': {
        onClick: load
    },
    'root.header.headerLeft.sort': {
        onClick: sort
    },
    'root.header.headerRight.del': {
        onClick: delSelected
    },
    'root.header.headerRight.print': {
        onClick: print
    },
    'root.header.headerRight.upload': {
        onClick: exportExcel
    },
    'root.header.headerRight.add': {
        onClick: add
    },
    'root.header.headerRight.audit': {
        onClick: auditSelected
    },
    'root.header.headerRight.import': {
        onClick: importTicket
    },
    'root.content.list.select': {
        isSelectAll: getIsSelectAll,
        visible: getSelectVisible
    },
    'root.content.list.workStatus': {
        onGridFilterChange: statusFilterChange
    },
    'root.content.list.operate.audit': {
        onClick: auditOne,
        disabled: getAuditDisabled

    },
    'root.content.list.operate.reject': {
        onClick: rejectOne,
        disabled: getRejectDisabled

    },
    'root.content.list.operate.del': {
        onClick: delOne,
        disabled: getDelDisabled
    },
    'root.content.list.code': {
        onLinkClick: link
    },
    'root.content.list.docCode': {
        onLinkClick: linkDoc
    },
    'root.footer.pagination': {
        onGridPageChanged: onGridPageChanged,
        onGridPageSizeChanged: onGridPageSizeChanged
    },
    'root.addOne': {
        onClick: add
    }
}

export function initView(com, store) {
    return injectFuns => {
        _com = com
        _i = injectFuns

        _a.initView({
            com,
            store,
            event,
            utils: _a.getUtils(exports)
        })(injectFuns)
    }
}

async function load() {
    let pagination = _a.f('pagination').toJS(),
        filter = _a.f('filter').toJS()

    let response = await _a.q(api.init, _i.post, pagination, filter)
    _i.reduce('load', response)
}


async function yearMonthChange(option) {
    if (!option.newValue)
        newValue = moment().format('YYYY-MM')

    let year = moment(option.newValue).year(),
        month = moment(option.newValue).month() + 1,
        pagination = _a.f('pagination').toJS(),
        filter = _a.f('filter').toJS()

    let response = await _a.q(api.init, _i.post, pagination, {...filter, year, month })
    response.filter = { year, month, yearMonth: `${year}-${month}` }

    _i.reduce('load', response)
}

async function statusFilterChange(option) {
    let pagination = _a.f('pagination').toJS(),
        filter = _a.f('filter').toJS()

    filter.workStatus = option.value

    try {
        let response = await _a.q(api.init, _i.post, pagination, filter)
        response.filter = { workStatus: option.value }
        _i.reduce('load', response)
    } catch (err) {}
}



async function sort(option) {
    let sortTypeId = option.selectIndex,
        pagination = _a.f('pagination').toJS(),
        filter = _a.f('filter').toJS()

    filter = {...filter, sortTypeId }

    try {
        let response = await _a.q(api.init, _i.post, pagination, filter)
        response.filter = { sortTypeId }
        _i.reduce('load', response)
    } catch (err) {}
}


async function auditSelected() {
    let selectedRows = _a.getSelectedRows('root.content.list.select')

    if (!selectedRows || selectedRows.size === 0) {
        _a.toast('请至少选择一条流水')
        return
    }

    let ids = selectedRows.map(o => o.get('id')).toJS(),
        tss = selectedRows.map(o => o.get('ts')).toJS(),
        codes = selectedRows.map(o => o.get('code')).toJS(),
        isExistsQKJCL = (selectedRows.findIndex(o => o.get('incomeType') == '请会计处理')　 != -1)

    //不存在请会计处理的记录
    if (!isExistsQKJCL) {
        audit(ids, codes, tss)
        return
    }

    if (await _a.confirm('审核', '【请会计处理】中的业务，审核后系统不能自动生成财务凭证，需要会计介入处理，是否继续审核？')) {
        audit(ids, codes, tss)
    }
}



async function auditOne(option) {
    if (option.rowIndex == -1)
        return

    let rowIndex = option.rowIndex

    let id = _a.f(`list.${rowIndex}.id`),
        ts = _a.f(`list.${rowIndex}.ts`),
        code = _a.f(`list.${rowIndex}.code`),
        paymentsTypeName = _a.f(`form.list.${rowIndex}.incomeType`)

    if (paymentsTypeName == '请会计处理') {
        if (await _a.confirm('审核', '【请会计处理】中的业务，审核后系统不能自动生成财务凭证，需要会计介入处理，是否继续审核？')) {
            audit([id], [code], [ts])
        }
    } else {
        audit([id], [code], [ts])
    }
}


async function rejectOne(option) {
    let rowIndex = option.rowIndex,
        id = _a.f(`list.${rowIndex}.id`),
        code = _a.f(`list.${rowIndex}.code`),
        ts = _a.f(`list.${rowIndex}.ts`)

    try {
        await _a.q(webapi.receipt.reject, _i.post, [id], [ts], [code])
        _a.toast('反审核成功', 'success')
        load()
    } catch (err) {}
}


async function audit(ids, codes, tss) {
    try {
        await _a.q(webapi.receipt.audit, _i.post, ids, tss, undefined, codes)
        _a.toast('审核成功', 'success')

        load()
    } catch (err) {}
}

async function delSelected() {
    let selectedRows = _a.getSelectedRows('root.content.list.select')

    if (!selectedRows || selectedRows.size === 0) {
        _a.toast('请至少选择一条流水')
        return
    }

    if (await _a.confirm('删除', '确定删除该流水账?')) {
        let ids = selectedRows.map(o => o.get('id')).toJS(),
            tss = selectedRows.map(o => o.get('ts')).toJS()
        del(ids, tss)
    }
}

async function delOne(option) {
    if (await _a.confirm('删除', '确定删除该流水账?')) {
        let rowIndex = option.rowIndex,
            id = _a.f(`list.${rowIndex}.id`),
            ts = _a.f(`list.${rowIndex}.ts`)

        del([id], [ts])
    }
}

async function del(ids, tss) {
    try {
        await _a.q(webapi.receipt.batchDel, _i.post, ids, tss)
        _a.toast('删除成功', 'success')
        load()
    } catch (err) {}
}





function print() {
    let year = _a.f('filter.year'),
        month = _a.f('filter.month'),
        workStatus = _a.f('filter.workStatus') || [1, 2, 3, 4],
        sortTypeId = consts.getOrderString(_a.f('filter.sortTypeId')) || '',
        ret = {}
    
    ret.sortYear = year
    ret.sortMonth = month
    ret.sts = workStatus
    ret.order = sortTypeId

    _a.q(webapi.receipt.print, _i.printPost, ret)
}

function exportExcel() {
    let year = _a.f('filter.year'),
        month = _a.f('filter.month'),
        workStatus = _a.f('filter.workStatus') || [1, 2, 3, 4],
        sortTypeId = consts.getOrderString(_a.f('filter.sortTypeId')) || ''

    _a.q(webapi.receipt.exportExcel, _i.formPost, year, month, workStatus, sortTypeId)
}

async function onGridPageChanged(option) {
    let { current, pageSize } = option,
    pagination = { current, pageSize },
        filter = _a.f('filter').toJS()

    try {
        let response = await _a.q(api.init, _i.post, pagination, filter)
        _i.reduce('load', response)
    } catch (err) {}
}
async function onGridPageSizeChanged(option) {
    //debugger
    let { current = 1, pageSize } = option,
    pagination = { current, pageSize },
        filter = _a.f('filter').toJS()

    try {
        let response = await _a.q(api.init, _i.post, pagination, filter)
        _i.reduce('load', response)
    } catch (err) {}
}



function add(option) {
    let year = _a.f('filter.year'),
        month = _a.f('filter.month')
    _com.props.onAddTab('流水账', 'apps/acm/richardTicket/card', { year, month })
}

function link(option) {
    let id = _a.f(`list.${option.rowIndex}.id`)
    _com.props.onAddTab('流水账', `apps/acm/richardTicket/card`, { id })
}

function linkDoc(option) {
    let docId = _a.f(`list.${option.rowIndex}.docId`)
    _com.props.onAddTab('查看凭证', `apps/fi/addVoucher`, { initData: { id: docId } })
}

async function importTicket() {
    let b = await _a.modal({
        title: "发票导入",
        app: "apps/acm/richardTicket/import",
        okText: '生成流水账',
        width: 1000,
        bodyStyle: { height: 500, padding: 10 },
    })

    //b !== false说明不是取消
    if (b) {
        load()
    }

}


function getRefreshDisabled(option) {
    return false
}

function getAuditDisabled(option) {
    let status = _a.f(`list.${option.rowIndex}.status`)

    //如果 已审核或者暂存 那么 设置disabled为true
    return status == 3 || status == 1
}


function getRejectDisabled(option) {
    let rowIndex = option.rowIndex,
        status = _a.f(`list.${rowIndex}.status`),
        sourceVoucherTypeId = _a.f(`list.${rowIndex}.sourceVoucherTypeId`)

    //如果 不是审核状态或者来源单不是流水账 那么 设置disabled为true
    return (status !== 3 || sourceVoucherTypeId != consts.sourceVoucherType.lsz.id)
}

function getDelDisabled(option) {
    let status = _a.f(`list.${option.rowIndex}.status`)
        //已审核
    return status === 3
}

function getIsSelectAll(option) {
    let existSelectedRow = _a.f('list').findIndex(o => o.get('select') === true && o.get('status') !== 3) != -1,
        existNotSelectedRow = _a.f('list').findIndex(o => o.get('select') !== true && o.get('status') !== 3) != -1

    //存在选择行并且不存在不选择行，认为是全选
    return existSelectedRow && !existNotSelectedRow
}

function getSelectVisible(option) {
    let rowIndex = option.rowIndex,
        status = _a.f(`list.${rowIndex}.status`)

    return status !== 3
}

export function listenTabFocus(){
    load()
}

export function listenTabAdd(props){
}

export function listenTabClose(closeTab){
    closeTab()
}


Object.assign(exports, {..._a, ...exports })
