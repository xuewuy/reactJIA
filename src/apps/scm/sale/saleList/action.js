import Immutable ,{fromJS} from 'immutable'
import * as da from 'dynamicAction'
import * as api from './api'
import webapi from 'webapi'
import moment from 'moment'
// 默认 日期 选择的 数据
let currentTime = moment().format('YYYY-MM-DD')
export function initView(){
	return injectFuns => {    
        let { setMessage, clearMessage, handleWebApiException, getterByField} = da,
        {reduce, post, getContext, setContext} = injectFuns
        let initData=api.puVoucherList.data
        da.initView({meta:api.puVoucherList.meta, data:initData}, exports)(injectFuns)
		api.init(injectFuns.post).then(ajaxData => {
            if(!handleWebApiException(ajaxData)(injectFuns)) return   
            let data=ajaxData.value
            initData.puList=data.dataList
            initData.defaultQuery = {
                "status": "", // --票据状态：127 未审核 ,128  已审核,129  已驳回   => 不传***
                "settleStatus": "", // -- 结算状态 ：130 未结清,131 已结清   => 不传***
                "customerId": "",  // --客户id
                "salesPersonId": "", // --销售员id
                // "invoiceTypeId": data.invoiceType.id,  // -- 票据类型：200000000000050 增值税普通发票,200000000000051 增值税专用发票,200000000000052 其他票据
                "invoiceTypeId": '',  // -- 票据类型：200000000000050 增值税普通发票,200000000000051 增值税专用发票,200000000000052 其他票据
                "startTime": "", // 开始时间
                "endTime":"",   // 结束时间
                "page": { // --分页信息            => 不传***
                    "currentPage": 1, // --当前要查询的页码  
                    "pageSize": 20 // --每页显示记录数量
                }
            } 
            api.puQuery.meta.childrens[0].childrens[1].dataSource = ajaxData.value.customerList// 客户第一项写值
            // api.puQuery.data.from.customer = fromJS(ajaxData.value.customerList[0])// 客户结合值
            api.puQuery.meta.childrens[0].childrens[2].dataSource  = ajaxData.value.personList // 销售员第一项写值
            api.puQuery.meta.childrens[0].childrens[3].dataSource  = ajaxData.value.invoiceType.enumDetail // 销售员第一项写值
            // api.puQuery.data.from.salesperson = fromJS(ajaxData.value.personList[0])//销售员集合值
            let objData = []
            let enumDetailValue = ajaxData.value.invoiceType.enumDetail
            for(var i=0;i<enumDetailValue.length;i++){
                let newObj = {
                    id:enumDetailValue[i].enumItemId,
                    name:enumDetailValue[i].enumItemName
                }
                objData.push(newObj)
            }
            
            let statesArr = ajaxData.value.dataList     
            da.initView({meta:api.puVoucherList.meta, data:initData}, exports)(injectFuns)    
            let defaultQueryObj = {
                defaultQuery: initData.defaultQuery,
                pendingNumber:ajaxData.value.notApproveCount,
                unclearedNumber:ajaxData.value.notSettleCount,
                page:ajaxData.value.page,
                ajaxData:ajaxData.value
            }    
            injectFuns.reduce('defaultQuery', defaultQueryObj)
        	})
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
        let ret = da.getter(path, propertys)(injectFuns)
        if (da.match(path, propertys, 'puVoucherList.puList.select', [ 'isSelectAll'])) {
            let  parsedPath = da.parsePath(path),
                existSelectedRow = da.getterByField('puList')(injectFuns).findIndex(o=>o.get('select') === true && o.get('status') !== 128) != -1,
                existNotSelectedRow = da.getterByField('puList')(injectFuns).findIndex(o=>o.get('select') !== true && o.get('status') !== 128) != -1,
                isSelectAll = false
            return setValue(ret, propertys, {'isSelectAll' : (existSelectedRow && !existNotSelectedRow)})
        }
         if (da.match(path, propertys, 'puVoucherList.puList.select', [ 'visible'])) {
            let  parsedPath = da.parsePath(path),
                status = da.getterByField(`puList.${parsedPath.vars[0]}.status`)(injectFuns)
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
    }
}
//分页
export function pageChange(eventName, option) {
    return (injectFuns) => {
        let {handleWebApiException } = da,
            { reduce, post } = injectFuns,
            puList = da.getterByField('defaultQuery')(injectFuns).toJS() 
        if(option.path == 'puVoucherList.paging'){
            let current = option.current, // 调到那一页
                pageSize = option.pageSize, // 每页多少个
                obj = {
                    page:{
                        currentPage:current,
                        pageSize:pageSize,
                        sumCloum:option.total
                    }
                }
                injectFuns.reduce('setPageSize', obj)
            let queryValue = da.getterByField('defaultQuery')(injectFuns).toJS() 
                queryValue.page.currentPage = current
                queryValue.page.pageSize = pageSize
                webapi.pu.puListEvent(post,queryValue).then(ajaxData => {
                    if (!handleWebApiException(ajaxData)(injectFuns)) return
                    let newPage = {
                        ajaxData:ajaxData.value,
                        defaultQuery:queryValue,
                        pendingNumber:ajaxData.value.notApproveCount,
                        unclearedNumber:ajaxData.value.notSettleCount,
                        page:ajaxData.value.page
                    }
                    injectFuns.reduce('handleRefresh', newPage)
                })
        }
    }
}

export function onFieldChange(path,oldValue,newValue){
    return injectFuns =>{
        let thisPath = path.split(',')[0], // path 的名字
            thisIndex = parseInt(path.split(',')[1]), // 这行的索引
            { handleWebApiInfo,getterByField,handleWebApiException } = da, 
            {getContext, setContext,reduce, post} = injectFuns
            // value = newValue.toJS()
        if(thisPath == 'puVoucherList.puList.select'){ 
            if(newValue){
                // true点击复选框 把 puList 数组的数据 放进去，保证 批量审核，审核指定的
                let puList = getterByField('puList')(injectFuns).toJS()
                let batchAuditArr = getterByField('batchAuditArr')(injectFuns).toJS()
                batchAuditArr.push({this:{
                    name:thisIndex,
                    content:puList[thisIndex]
                }})
                reduce('checkboxed',batchAuditArr)
            }else{
                // false 删掉指定的数组，批量审核数组
                let deleteBatchArr = getterByField('batchAuditArr')(injectFuns).toJS()
                deleteBatchArr.map((item,index) => {
                    if(item.this.name == thisIndex){
                        deleteBatchArr.splice(index,1)
                    }
                })
                reduce('checkboxOut',deleteBatchArr)
            } 
        }
        da.onFieldChange(path, oldValue, newValue)(injectFuns)
    }
}
export function getterByAjax(path, property, onSuccess) {
    return injectFuns=> {
        if (!path) return
        let {parsePath} = da
        let parsedPath = parsePath(path)
           
        //每次点击客户时发起请求 
        
    }
}
export function onEvent(eventName, option,cb){ 
    return injectFuns => {
        let defaultQuery ;
        if(eventName == 'onRetrieveOk'){
            let {handleWebApiException, handleWebApiInfo} = da, { reduce, post } = injectFuns,
                value = option.data.toJS().from,
                toolbar = {
                    rangeStart:value.dateRangePicker.rangeStart, // 开始时间
                    rangeEnd:value.dateRangePicker.rangeEnd, // 结束时间
                }
                defaultQuery = {
                    "status": da.getterByField('defaultQuery')(injectFuns).toJS().status, //--票据状态：127 未审核 ,128  已审核,129  已驳回   => 不传***
                    "settleStatus": '' ,// -- 结算状态 ：130 未结清,131 已结清   => 不传***
                    // "customerId": value.customer.id,  // --客户id
                    "customerId": value.customer.id ? value.customer.id : '', // --客户id
                    // "salesPersonId": value.salesperson_z.id, // --销售员id
                    "salesPersonId": value.salesperson.id ? value.salesperson.id : '', // --销售员id
                    "invoiceTypeId": value.currencyName.enumItemId ? value.currencyName.enumItemId : '',  // -- 票据类型：200000000000050 增值税普通发票,200000000000051 增值税专用发票,200000000000052 其他票据
                    "startTime": value.dateRangePicker.rangeStart, // 开始时间
                    "endTime":value.dateRangePicker.rangeEnd,   // 结束时间
                    "page": { // --分页信息            => 不传***
                        "currentPage": 1, // --当前要查询的页码  
                        "pageSize": 20// --每页显示记录数量
                    }
                } 
                cb && cb({result: true})
                let DefaultTime =  value.dateRangePicker.rangeStart + '至' + value.dateRangePicker.rangeEnd
                injectFuns.reduce('setTime',DefaultTime) // 设置时间
                fnHandle(injectFuns, defaultQuery)
        }else if(eventName == 'onTabChange'){   
            if(option.value == '0'){
                let defaultQuery_a = da.getterByField('defaultQuery')(injectFuns).toJS()
                defaultQuery_a.status = ''
                defaultQuery_a.settleStatus = ''
                fnHandle(injectFuns, defaultQuery_a)
            }else if(option.value == '1'){
                let defaultQuery_b = da.getterByField('defaultQuery')(injectFuns).toJS()
                defaultQuery_b.status = 127
                defaultQuery_b.settleStatus = ''
                fnHandle(injectFuns, defaultQuery_b)
            }else{
                let defaultQuery_c = da.getterByField('defaultQuery')(injectFuns).toJS()
                defaultQuery_c.status = ''
                defaultQuery_c.settleStatus = 130
                fnHandle(injectFuns, defaultQuery_c)
            }   
        }else if(eventName == 'onGridSelectAll'){
            let puList = da.getterByField('puList')(injectFuns).toJS()
            let batchAuditArr2 = []
                puList.map((item,index) => {
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
        }   
        else{
            //重写dynamicAction的事件后,需要再手工执行一下父类事件
             da.onEvent(eventName, option)(injectFuns)
        }        
    }
}
// 点击删除 图标
export function deleteIcon(value){
	return injectFuns => {
        let rowIndex = value.rowIndex   // 索引
        let {clearMessage, setMessage, getterByField} = da,
        delSuccessText = '删除',
        puList = getterByField('puList')(injectFuns).toJS(),
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
                 webapi.pu.del(injectFuns.post, list).then(data => {
                    if (!da.handleWebApiInfo(data)(injectFuns)) return
                        
                    let newState = value.payload.toJS().data_runtime.puList, // [{},{}]
                        isAuditStatus = newState[rowIndex].status // 审核状态
                    //     未审核                    已审核                   已驳回
                    if(isAuditStatus == '127' && isAuditStatus != '128' && isAuditStatus != '129'){
                        //未审核状态的单据可以删除，其它则不允许
                        let id = newState[0].id  // 删除的id
                        // 向服务器发送请求，删除这一条数据
                        //在本地 api 也进行删除
                        newState.splice(rowIndex,1)
                        injectFuns.reduce('deleteIcon',newState)
                        da.setMessage({ type: 'success', mode: 'message', content: '成功' + delSuccessText + '单据！' })(injectFuns)                    
                    }                
                }) 
            } 
        })(injectFuns)	 
	}
}
//点击收款 图标
export function receivables(value){
    return injectFuns => {
        let rowIndex = value.rowIndex,   // 索引
        newState = value.payload.toJS().data_runtime.puList, // [{},{}]
        settlementStatus = newState[rowIndex].settleStatus // 结算状态
        if(settlementStatus == '130' && settlementStatus != '131'){
            //所有未结清的单据可以触发收款
            alert('所有未结清的单据可以触发收款')
        }else{
            return
        }
    }
}
// 点击 反审核 图标
export function backAuditPerson(value){
    return injectFuns => {
        let index = value.rowIndex   // 索引
        let delSuccessText = '反审核成功'
            let puList = da.getterByField('puList')(injectFuns).toJS()
            let ToUnAudit = {
                "id": puList[index].id,
                "ts": puList[index].ts
            }
            webapi.pu.unAudit(injectFuns.post, ToUnAudit).then(data => { 
                if (!da.handleWebApiInfo(data)(injectFuns)) return   
                da.setMessage({ type: 'success', mode: 'message', content: delSuccessText+'！' })(injectFuns)
                let defaultQueryData = da.getterByField('defaultQuery')(injectFuns).toJS()
                fnHandle(injectFuns, defaultQueryData)
            })
    }
}
// 点击审核 图标
export function auditPerson(value){
    return injectFuns => {
        let rowIndex = value.rowIndex,   // 索引
        newState = value.payload.toJS().data_runtime.puList, // [{},{}]
        auditStatus = newState[rowIndex].status // 审核状态
        if(auditStatus != '128'){
            let delSuccessText = '提交审核'
            let puList = da.getterByField('puList')(injectFuns).toJS()
            let listToExamine = {
                "id": puList[rowIndex].id,
                "ts": puList[rowIndex].ts
            }
            webapi.pu.audit(injectFuns.post, listToExamine).then(data => { 
                if (!da.handleWebApiInfo(data)(injectFuns)) return   
                da.setMessage({ type: 'success', mode: 'message', content: '成功' + delSuccessText + '单据！' })(injectFuns)
                // let obj = {
                //     index : rowIndex, // 改变哪一行
                //     thisData : data.value,//改变这一行的数据是什么
                //     BokAudit:true
                // }
                // injectFuns.reduce('toExaminePuListCurrent', obj)
                let defaultQueryData = da.getterByField('defaultQuery')(injectFuns).toJS()
                fnHandle(injectFuns, defaultQueryData)
            })
        }else{
            return
        }
    }
}
// 刷新
export function handleRefresh(){
    return injectFuns => {
        let defaultQuery = da.getterByField('defaultQuery')(injectFuns).toJS()
        let data = fnHandle(injectFuns,defaultQuery)
    }
}
// 
function fnHandle(injectFuns,value){
    let {handleWebApiException, handleWebApiInfo} = da, { reduce, post } = injectFuns
     webapi.pu.puListEvent(post,value).then(ajaxData => {
        if (!handleWebApiException(ajaxData)(injectFuns)) return
        let queryData = {
            ajaxData:ajaxData.value,
            defaultQuery:value,
            pendingNumber:ajaxData.value.notApproveCount,
            unclearedNumber:ajaxData.value.notSettleCount,
            page:ajaxData.value.page
        }
        injectFuns.reduce('handleRefresh', queryData)
        reduce('checkboxOut',[])
    })
}



// 批量删除
export function puDl(){
    return injectFuns => {
        let {handleWebApiException, handleWebApiInfo} = da, { reduce, post } = injectFuns
        let newBatchAuditArr = da.getterByField('batchAuditArr')(injectFuns).toJS(),
            listBatch = []
            if(newBatchAuditArr.length == 0){
                da.setMessage({ type: 'warning', mode: 'message', content: '没有选择批量删除的' + '单据！' })(injectFuns)
                return
            }
            newBatchAuditArr.map(item =>{
                let obj = {
                    "id": item.this.content.id,
                    "ts": item.this.content.ts
                }
                listBatch.push(obj)
            })
            webapi.pu.deleteBatch(post,listBatch).then(ajaxData => {
                if (!handleWebApiException(ajaxData)(injectFuns)) return       
                if(ajaxData.result == true && ajaxData.value !== true){ 
                    da.setMessage({
                        type: 'warning',
                        mode:'message',
                        content: ajaxData.value[0].message
                    })(injectFuns) 
                }else if(ajaxData.result == true && ajaxData.value == true){
                    da.setMessage({ 
                        type: 'success',
                        mode:'message',
                        content: '批量删除'+listBatch.length+'个数据'
                    })(injectFuns)
                    reduce('checkboxOut',[])
                }
                
                let defaultQueryData = da.getterByField('defaultQuery')(injectFuns).toJS()
                fnHandle(injectFuns, defaultQueryData)
            })
    }
}
// 批量审核
export function toExamine(){
    return injectFuns => {
        let {handleWebApiException, handleWebApiInfo} = da, { reduce, post } = injectFuns
        let newBatchAuditArr = da.getterByField('batchAuditArr')(injectFuns).toJS(),
            listBatch = []
            if(newBatchAuditArr.length == 0){
                da.setMessage({ type: 'warning', mode: 'message', content: '没有选择批量审核的' + '单据！' })(injectFuns)
                return
            }
            newBatchAuditArr.map(item =>{
                let obj = {
                    "id": item.this.content.id,
                    "ts": item.this.content.ts
                }
                listBatch.push(obj)
            })
            webapi.pu.deliveryAuditBatch(post,listBatch).then(ajaxData => {
                if (!handleWebApiException(ajaxData)(injectFuns)) return       
                if(ajaxData.result == true && ajaxData.value !== true){ 
                    da.setMessage({
                        type: 'warning',
                        mode:'message',
                        content: ajaxData.value[0].message
                    })(injectFuns) 
                }else if(ajaxData.result == true && ajaxData.value == true){
                    da.setMessage({ 
                        type: 'success',
                        mode:'message',
                        content: '批量审核'+listBatch.length+'个数据'
                    })(injectFuns)
                    reduce('checkboxOut',[])
                }
                
                let defaultQueryData = da.getterByField('defaultQuery')(injectFuns).toJS()
                fnHandle(injectFuns, defaultQueryData)
            })
    }
}
// 打印
export function handlePrint(){
    return injectFuns => {
        let puList = da.getterByField('defaultQuery')(injectFuns).toJS()        
        if(!puList) return
        webapi.pu.deliveryPrintDeliveryList(injectFuns.formPost,puList)
    }
}
// 导出
export function handleDownLoad(){
    return injectFuns => {
        let { handleWebApiInfo, getterByField } = da, { formPost, reduce, getContext } = injectFuns,
            puList = da.getterByField('defaultQuery')(injectFuns).toJS() 
        if(!puList){
            da.setMessage({
                type: 'warning',
                mode:'message',
                content: '没有可导出数据'
            })(injectFuns)
        }else{
            webapi.pu.puListExportDeliveryList(formPost, puList)
        }
    }
}
Object.assign(exports, {...da, ...exports })



