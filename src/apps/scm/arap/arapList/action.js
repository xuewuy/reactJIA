import * as da from 'dynamicAction'
import * as api from './api'
import webapi from 'webapi'
import Immutable, { List ,fromJS } from 'immutable'
import moment from 'moment'

export function initView() {
    return injectFuns => {
        let {handleWebApiException } = da,
            { reduce, post } = injectFuns,
            data = api.getData(),
            meta = api.getMeta(),
            toolMeta = api.accountQuery.meta,
            toolData = api.accountQuery.data
        let params=data.queryPrams  
        // da.initView({meta, data},exports)(injectFuns)   
        webapi.arap.list(post,params).then(ajaxData => {
            if (!handleWebApiException(ajaxData)(injectFuns)) return
            let value=ajaxData.value
            data.list=value.list
            data.queryPrams.page = value.page
            data.customerIds = value.customers
            data.paging.current = value.page.currentPage
            data.paging.pageSize = value.page.pageSize
            data.paging.total = value.page.sumCloum
            toolMeta.childrens[0].childrens[1].dataSource = value.customers
            da.initView({meta, data},exports)(injectFuns)      
        })
    }
}
export function delOne(rowIndex){
    return injectFuns =>{
        let {getterByField} = da,
            id = getterByField(`list.${rowIndex}.id`)(injectFuns),
            ts = getterByField(`list.${rowIndex}.ts`)(injectFuns)
        del(injectFuns, id, ts)
    }
}
// 我的 点击图标删除
// 点击删除 图标
export function deleteIcon(value){
    return injectFuns => {
        let rowIndex = value.rowIndex   // 索引
        let {clearMessage, setMessage, getterByField} = da,
        delSuccessText = '删除',
        puList = getterByField('list')(injectFuns).toJS(),
        list = {
            "id": puList[rowIndex].id, // 销货单 id   (客户 id)
            "orgId":puList[rowIndex].orgId, // 销货单组织 id
            "ts": puList[rowIndex].ts // 日期
        },
        delText = '确定删除该单据?'
        setMessage({
            type: 'confirm',
            title: delSuccessText + '单据',
            content: delText,
            refName: 'voucher',
            width: 360,
            onCancel: function(){
                clearMessage()(injectFuns)
            },
            onOk:function(){
                clearMessage()(injectFuns)
                 webapi.arap.del(injectFuns.post, list.id, list.ts).then(data => {
                    if (!da.handleWebApiInfo(data)(injectFuns)) return
                        

                    //     未审核                    已审核                   已驳回
                        //未审核状态的单据可以删除，其它则不允许
                        //let id = newState[0].id  // 删除的id
                        // 向服务器发送请求，删除这一条数据
                        //在本地 api 也进行删除
                        // newState.splice(rowIndex,1)
                        // injectFuns.reduce('deleteIcon',newState)
                        let queryPrams = da.getterByField('queryPrams')(injectFuns).toJS()
                        accountQueryForRpt(queryPrams)(injectFuns)
                        da.setMessage({ type: 'success', mode: 'message', content: '成功' + delSuccessText + '单据！' })(injectFuns)                    
                                  
                }) 
            } 
        })(injectFuns)   
    }
}

// // 单个删除
// function del(injectFuns, ids, tss){
//     let {  handleWebApiException, setMessage, clearMessage } = da,
//         { post } = injectFuns
//     webapi.arap.del(post, ids, tss).then(data => {
//         if (!handleWebApiException(data)(injectFuns)){
//             clearMessage()(injectFuns)
//             return
//         }
//         setMessage({
//             type: 'success',
//             mode: 'message',
//             content: '删除成功'
//         })(injectFuns)
//         loadData(injectFuns)
//     })
// }
// function loadData(injectFuns,pageSize, currentPage) {
//     let { post, reduce } = injectFuns, { getterByField } = da,
//         d = getterByField()(injectFuns)
//     pageSize = pageSize || d.getIn(['pagination', 'pageSize'])
//     currentPage = currentPage || d.getIn(['pagination', 'current'])
//     init(injectFuns,{ pageSize, currentPage }, (ret) => {
//         d = d.setIn(['list'], fromJS(ret.list))
//         d = d.setIn(['form', 'pagination'], fromJS({ current: currentPage, pageSize, total: ret.page.sumCloum }))
//         reduce('loadData', '', d)
//     })
// }
// export function changeTableType(value) {
//     return injectFuns =>{
//         injectFuns.reduce('changeTableType',value)
//     }
// }
//刷新
export function refresh(){
    return injectFuns =>{
        let queryPrams = da.getterByField('queryPrams')(injectFuns).toJS()
        accountQueryForRpt(queryPrams)(injectFuns)
    }
}
//打印
export function print(){
    return injectFuns=>{
        let printParams = da.getterByField('queryPrams')(injectFuns).toJS()
        webapi.arap.listprint(injectFuns.formPost,printParams)
    }
}
//导出excel
export function exportExcel(){
    return injectFuns=>{
        let printParams = da.getterByField('queryPrams')(injectFuns).toJS()
        webapi.arap.listexport(injectFuns.formPost,printParams)
    }
}
//请求查询数据
function query(queryPrams){
    return injectFuns =>{
        let {handleWebApiException } = da,
            { reduce, post } = injectFuns,
            params =queryPrams? queryPrams : da.getterByField('queryPrams')(injectFuns).toJS()
        webapi.accountBook.getdata(post,params).then(ajaxData => {
            if (!handleWebApiException(ajaxData)(injectFuns)) return
            let list = ajaxData.value;
            reduce('setData',parseTableData(list))
        })
    }  
}
//给data设置查询数据
function parseTableData(data){
    if(!data) return data
    let listAccount  = [];
    for(let i = 0; i < data.length; i++ ){
        let tempPeriod = data[i].accountDate,
            temp = [];
        for(let j = 0; j < data[i].fiSumAccountRptQueryDetailDto.length; j++){
            let item = data[i].fiSumAccountRptQueryDetailDto[j]
            listAccount.push({
                period: data[i].accountDate               
            })
        }
    }
    return listAccount
}

function init(injectFuns, page, cb) {
    let { initView, setMessage, clearMessage, handleWebApiException, getterByField } = da, { reduce, post } = injectFuns,
    ret = {}
    let customerId
    if(false){
        customerId='1757202074109952'
    }
    let defaultFilter= api.getData().queryPrams
    webapi.arap.list(injectFuns.post,defaultFilter).then(data=>{
        if (!handleWebApiException(data)(injectFuns)) return
        ret.page = data.value.page
        if (!data.value.list || data.value.list.length == 0){
            ret.list = []
        }else{
            ret.list = data.value.list.map(o => {
                return {
                    select: false,
                    id: o.id,
                    code: o.code,
                    bankAccountId: o.bandAccountId,
                    bankAccountName:o.bankAccountName,
                    businessDate:o.businessDate,
                    customerId:o.customerId,
                    customerName:o.customerName,
                    orgId:o.orgId,
                    receivePayAmount:o.receivePayAmount,
                    status:o.status,
                    statusName:o.statusName,
                    ts: o.ts
                }
            })
        }
        cb(ret)
    })
}
export function onEvent(eventName, option,cb) {
    return (injectFuns) => {
        if (!option.path) {
            return
        }
        if(eventName == 'onRetrieveOk'){
            let data = option.data,
                begindate = option.data.toJS().from.dateRangePicker.rangeStart,
                enddate = option.data.toJS().from.dateRangePicker.rangeEnd,
                customer=option.data.toJS().from.customer
            cb && cb({result:true})
            let dateJson = {
                beginDate:begindate,
                endDate:enddate,
                customerIds:customer.id ? [customer.id] : [],
                page:da.getterByField('queryPrams.page')(injectFuns)
            }
            // injectFuns.reduce('saveQueryPramsAndTextValue', dateJson)
            let {handleWebApiException } = da, { reduce, post } = injectFuns
            accountQueryForRpt(dateJson)(injectFuns)
        }else if(eventName == 'onGridSelectAll'){
            if(option.selected){
                let list = da.getterByField('list')(injectFuns).toJS()
                let batchAuditArr2 = []
                    list.map((item,index) => {
                        if(item.status == 127){
                            let arr = {this:{
                                name:index,
                                content:item
                            }}
                            batchAuditArr2.push(arr)
                        }
                    })

                    
                    injectFuns.reduce('checkboxed',batchAuditArr2)
                    da.onEvent(eventName, option)(injectFuns)
            }else{
                reduce('checkboxOut',[])
                da.onEvent(eventName, option)(injectFuns)
            }
        }else if(eventName == 'onGridFilterChange'){
            let screenArr = option.value
                switch(screenArr.length){
                    case 0:
                        let defaultQueryData = da.getterByField('queryPrams')(injectFuns).toJS()
                            defaultQueryData.statusIds = []
                            accountQueryForRpt(defaultQueryData)(injectFuns)
                            da.onEvent(eventName, option)(injectFuns) 
                    break;
                    case 1:
                        screenArr.map(o => {
                            if(o == 2){
                                // 未审核
                                //127(未审核)
                                let defaultQueryData = da.getterByField('queryPrams')(injectFuns).toJS()
                                defaultQueryData.statusIds = [127]
                                accountQueryForRpt(defaultQueryData)(injectFuns)
                            }else if(o == 1){
                                // 已审核
                                //128(已审核)
                                let defaultQueryData = da.getterByField('queryPrams')(injectFuns).toJS()
                                defaultQueryData.statusIds = [128]
                                accountQueryForRpt(defaultQueryData)(injectFuns)
                            }else if(o == 3){
                                //驳回
                                //129(已驳回)
                                let defaultQueryData = da.getterByField('queryPrams')(injectFuns).toJS()
                                defaultQueryData.statusIds = [129]
                                accountQueryForRpt(defaultQueryData)(injectFuns)
                            }
                        })
                        da.onEvent(eventName, option)(injectFuns) 
                    break;
                    case 2:
                        
                            if(screenArr[0] == 2 && screenArr[1] == 1){
                                // 未审核
                                //127(未审核) //128(已审核)
                                let defaultQueryData = da.getterByField('queryPrams')(injectFuns).toJS()
                                defaultQueryData.statusIds = [127,128]
                                accountQueryForRpt(defaultQueryData)(injectFuns)
                            }else if(screenArr[0] == 2 && screenArr[1] == 3){
                                // 已审核
                                //127(未审核) //129(已驳回)
                                let defaultQueryData = da.getterByField('queryPrams')(injectFuns).toJS()
                                defaultQueryData.statusIds = [127,129]
                                accountQueryForRpt(defaultQueryData)(injectFuns)
                            }else if(screenArr[0] == 1 && screenArr[1] == 3){
                                //驳回
                                //128(已审核) //129(已驳回)
                                let defaultQueryData = da.getterByField('queryPrams')(injectFuns).toJS()
                                defaultQueryData.statusIds = [128,129]
                                accountQueryForRpt(defaultQueryData)(injectFuns)
                            }
                            da.onEvent(eventName, option)(injectFuns) 
                    break;
                    case 3:
                            if(screenArr){
                                // 未审核
                                //127(未审核) //128(已审核) //129(已驳回)
                                let defaultQueryData = da.getterByField('queryPrams')(injectFuns).toJS()
                                defaultQueryData.statusIds = [127,128,129]
                                accountQueryForRpt(defaultQueryData)(injectFuns)
                            }
                            da.onEvent(eventName, option)(injectFuns) 
                    break;

                }
                
        } 
        else{
            //重写dynamicAction的事件后,需要再手工执行一下父类事件
            da.onEvent(eventName, option)(injectFuns) 
        }
        
    }
}
function setValue(ret, propertys, wrappers) {
    if (typeof(propertys) == 'string') {
        return wrappers.hasOwnProperty(propertys) ? wrappers[propertys] : ret
    }
    propertys.forEach(p => {
        if (wrappers.hasOwnProperty(p))
            ret = ret.set(p, wrappers[p])
    })
    return ret
}
export function getter(path, propertys) {
    return injectFuns => {
        if(da.getterByField('list')(injectFuns)){
            let ret = da.getter(path, propertys)(injectFuns)
            if (da.match(path, propertys, 'root.list.select', [ 'isSelectAll'])) {

                let  parsedPath = da.parsePath(path),
                    existSelectedRow = da.getterByField('list')(injectFuns).findIndex(o=>o.get('select') === true && o.get('status') !== 128) != -1,
                    existNotSelectedRow = da.getterByField('list')(injectFuns).findIndex(o=>o.get('select') !== true && o.get('status') !== 128) != -1,
                    isSelectAll = false
                return setValue(ret, propertys, {'isSelectAll' : (existSelectedRow && !existNotSelectedRow)})
            }
             if (da.match(path, propertys, 'root.list.select', [ 'visible'])) {
                let  parsedPath = da.parsePath(path),
                    status = da.getterByField(`list.${parsedPath.vars[0]}.status`)(injectFuns)
                ret = status === 128 ? setValue(ret, propertys, {
                    visible: false
                }) : setValue(ret, propertys, {
                    visible: true
                })
                return ret
            }
            else if(da.match(path, propertys, 'puVoucherList.paging', ['startSequence'])){
                let currPage = da.getterByField('paging.current')(injectFuns),
                    pageSize = da.getterByField('paging.pageSize')(injectFuns)
                let startSequence = (currPage - 1) * pageSize
                return setValue(ret, propertys, {
                    startSequence: startSequence
                })
            }
            else{
                return ret
            }
        }else{
            return da.getter(path, propertys)(injectFuns)
        }
        
    }
}
// 批量 审核、删除公用的 行为
function batchBehavior(who, want){
    return injectFuns => {
        let {handleWebApiException, handleWebApiInfo} = da, { reduce, post } = injectFuns
        let newBatchAuditArr = da.getterByField('batchAuditArr')(injectFuns).toJS(),
            listBatch = []
            
            if(newBatchAuditArr.length == 0){
                da.setMessage({ type: 'warning', mode: 'message', content: `没有选择批量${want}的单据！` })(injectFuns)
                return
            }
            newBatchAuditArr.map(item =>{
                let obj = {
                    "id": item.this.content.id,
                    "ts": item.this.content.ts
                }
                listBatch.push(obj)
            })
            if(who == 'dl'){
                webapi.arap.deletebatch(post,listBatch).then(ajaxData => {
                    if (!handleWebApiException(ajaxData)(injectFuns)) return
                        da.setMessage({ 
                            type: 'success',
                            mode:'message',
                            content: `批量${want}${listBatch.length}个数据`
                        })(injectFuns)
                        reduce('checkboxOut',[])
                let defaultQueryData = da.getterByField('queryPrams')(injectFuns).toJS()
                        accountQueryForRpt(defaultQueryData)(injectFuns)
                })
            }else if(who == 'audit'){
                webapi.arap.auditbatch(post,listBatch).then(ajaxData => {
                    if (!handleWebApiException(ajaxData)(injectFuns)) return
                        da.setMessage({ 
                            type: 'success',
                            mode:'message',
                            content: `批量${want}${listBatch.length}个数据`
                        })(injectFuns)  
                    reduce('checkboxOut',[])
                let defaultQueryData = da.getterByField('queryPrams')(injectFuns).toJS()
                        accountQueryForRpt(defaultQueryData)(injectFuns)    
                })                
            }
            

    }
}
// 批量删除
export function arapDl(){
    return injectFuns => {
        batchBehavior('dl','删除')(injectFuns)
    }
}
// 批量审核
export function toExamine(){
    return injectFuns => {
        batchBehavior('audit','审核')(injectFuns)
    }
}
//筛选
function accountQueryForRpt(currency){
    return injectFuns =>{
        let {handleWebApiException } = da,
            { reduce, post } = injectFuns
        webapi.arap.list(post,currency).then(ajaxData=>{
            if (!handleWebApiException(ajaxData)(injectFuns)) return
                let objData = {
                    data : ajaxData.value,
                    currency:currency
                }
            reduce('listData',objData)
        }) 
    }
}
// 审核
export function handleAuditOne(value){
    return injectFuns => {
        let rowIndex = value.rowIndex   // 索引
            let delSuccessText = '提交审核'
            let arapList = da.getterByField('list')(injectFuns).toJS()
            let listToExamine = {
                "id": arapList[rowIndex].id,
                "ts": arapList[rowIndex].ts
            }
            webapi.arap.audit(injectFuns.post, listToExamine.id,listToExamine.ts).then(data => { 
                if (!da.handleWebApiInfo(data)(injectFuns)) return   
                da.setMessage({ type: 'success', mode: 'message', content: '成功' + delSuccessText + '单据！' })(injectFuns)
                let defaultQueryData = da.getterByField('queryPrams')(injectFuns).toJS()
                accountQueryForRpt(defaultQueryData)(injectFuns)
            })
    }
}
// 反审核
export function backAuditOne(value){
    return injectFuns => {
        let rowIndex = value.rowIndex   // 索引         
            let arapList = da.getterByField('list')(injectFuns).toJS()
            let listToExamine = {
                "id": arapList[rowIndex].id,
                "ts": arapList[rowIndex].ts
            }
            webapi.arap.unaudit(injectFuns.post, listToExamine.id,listToExamine.ts).then(data => { 
                if (!da.handleWebApiInfo(data)(injectFuns)) return   
                da.setMessage({ type: 'success', mode: 'message', content: '反审核成功！' })(injectFuns)
                let defaultQueryData = da.getterByField('queryPrams')(injectFuns).toJS()
                accountQueryForRpt( defaultQueryData)(injectFuns)
            })
    }
}

export function onFieldChange(path,oldValue,newValue){
    return injectFuns =>{
          //重写dynamicAction的事件后,需要再手工执行一下父类事件
        if(typeof newValue === 'string') {
            return da.onFieldChange(path, '', '')(injectFuns)
        }
        da.onFieldChange(path, oldValue, newValue)(injectFuns)
        let thisPath = path.split(',')[0], // path 的名字
            thisIndex = parseInt(path.split(',')[1]), // 这行的索引
            { handleWebApiInfo,getterByField,handleWebApiException } = da, 
            {getContext, setContext,reduce, post} = injectFuns
        if (path === 'root.customerSelect') {
            let params = da.getterByField('queryPrams')(injectFuns).toJS()
            params.accountcode = newValue.toJS().code 
            reduce('saveQueryPrams', params)
            reduce('setAccountSelected',newValue.toJS())
            query()(injectFuns)
        }else if(thisPath == 'root.list.select'){
            if(newValue){
                let toArapList = getterByField('list')(injectFuns).toJS()
                let batchAuditArr = getterByField('batchAuditArr')(injectFuns).toJS()
                batchAuditArr.push({this:{
                    name:thisIndex,
                    content:toArapList[thisIndex]
                }})
                reduce('checkboxed',batchAuditArr)
            }else{
                let deleteBatchArr = getterByField('batchAuditArr')(injectFuns).toJS()
                deleteBatchArr.map((item,index) => {
                    if(item.this.name == thisIndex){
                        deleteBatchArr.splice(index,1)
                    }
                })
                reduce('checkboxOut',deleteBatchArr)
            }             
        }
    }
}
Object.assign(exports, {...da, ...exports })



