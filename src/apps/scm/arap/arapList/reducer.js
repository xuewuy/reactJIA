import * as dr from 'dynamicReducer'
import { fromJS, Map} from 'immutable'
import * as api from './api'
import moment from 'moment'
let currentTime = moment().format('YYYY-MM-DD')

export function setData(state,data){
	state = dr.setterByField(state,'list',fromJS(data))
	return state
}
// 查询
export function listData(state,data){
	state = data.data.list ? setData(state,data.data.list) : setData(state,[])
	state = page(state,data.data.page)
	state = saveQueryPramsAndTextValue(state,data)
	state = queryPramsAll(state,data.currency)

	state = paging(state,data)
	return state
}
// 内容复选框 选中
export function checkboxed(state, value){
	
	state = dr.setterByField(state,'batchAuditArr',fromJS(value))
	return state
}
// 删除 批量审核的内容
export function checkboxOut(state, value){
	state = dr.setterByField(state,'batchAuditArr',fromJS(value))
	return state 
}
//paging
export function paging(state,value){
	state = dr.setterByField(state, 'paging.current', value.data.page.currentPage)// 现在 在 那一页
	state = dr.setterByField(state, 'paging.total', value.data.page.sumCloum) 	// 一共多少 条
	state = dr.setterByField(state, 'paging.pageSize', value.data.page.pageSize) // 每页多少个
	return state
}
// page
export function page(state,data){
	state = dr.setterByField(state,'queryPrams.page',data)
	return state
}
export function changeTableType (state,value){
	return dr.setterByField(state,'tableType',value)
}
export function setAccountAndType(state,dataSource,selectData){
	let queryPrams = dr.getterByField(state,'queryPrams').toJS(),
		currencyId = queryPrams.currencyId
		selectData = selectData? setAccountSelect(selectData,currencyId) :setAccountSelect(dataSource[0],currencyId)

	queryPrams.accountcode = selectData.id
 	state = queryPramsAll(state,queryPrams)
	state = dr.setter(state,'root.customerSelect','dataSource',fromJS(dataSource))
	state = dr.setterByField(state,'customerSelect',fromJS(selectData))
	state = dr.setterByField(state,'tableType',fromJS(selectData.type))
	return state
}
// 对公共数据 专门设置
export function queryPramsAll(state,value){

	return dr.setterByField(state,'queryPrams',fromJS(value))
}
//设置选中数据，并确定tableType
function setAccountSelect(selectData,currencyId){
	let newData = {}
		newData.type = 0
	if(selectData){
		if(!selectData.isQuantityCalc && selectData.isMultiCalc){
			if(currencyId =='0'||currencyId =='1'){
				newData.type = 0
			}else{
				newData.type = 1
			}
		}else if(selectData.isQuantityCalc && !selectData.isMultiCalc){
			newData.type = 2
		}else if(selectData.isQuantityCalc && selectData.isMultiCalc){
			newData.type =  currencyId =='0'? 2:3
			if(currencyId =='0'||currencyId =='1'){
				newData.type = 2
			}else{
				newData.type = 3
			}
		}
		newData.id = selectData.code|| selectData.id
		newData.codeAndName=selectData.codeAndName
	}
	return newData
}
export function setAccountSelected(state,selected){
	let currencyId = dr.getterByField(state,'queryPrams').toJS().currencyId
	state = dr.setterByField(state,'customerSelect',fromJS(setAccountSelect(selected,currencyId)))
	state = dr.setterByField(state,'tableType',fromJS(setAccountSelect(selected,currencyId).type))
	return state
}
export function saveQueryPrams(state,queryPrams){
	return dr.setterByField(state,'queryPrams',fromJS(queryPrams))
}


export function saveQueryPramsAndTextValue(state,value){
	let thisDate
	if(value.currency.beginDate == '' && value.currency.endDate == ''){
		thisDate = ''
	}else{
		thisDate = value.currency.beginDate +'至'+value.currency.endDate
	}
	state = dr.setterByField(state,'accountQuery.data.dateRangePicker',[value.currency.beginDate,value.currency.endDate])
	state = value.currency.customerIds.customer ? dr.setterByField(state,'accountQuery.data.customer',fromJS(value.currency.customer)) : dr.setterByField(state,'accountQuery.data.customer',[]) 
	state = dr.setterByField(state,'accountQuery.data.defaultDiplayText',thisDate)
	state = queryPramsAll(state,value)
	return state
}

export function resetData(state){
	//state = dr.setterByField(state,'list',fromJS([]))
	state = dr.setter(state,'root.customerSelect','dataSource',fromJS([]))
	state = dr.setterByField(state,'customerSelect',null)
	state = dr.setterByField(state,'tableType',0)
	state = dr.setterByField(state,'list',fromJS([]))
	return state
}

Object.assign(exports, {...dr,...exports})



