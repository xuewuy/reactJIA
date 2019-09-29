/**
 * Create by zhaoq on 16/10/8.
 */
import * as da from 'dynamicAction'
import * as api from './api'
import * as fun from './component/utils'
import webapi from 'webapi'

export function initView(initData){
	return injectFuns =>{
        let appInfo = injectFuns.getContext().appInfo,
            apiData = api.adjunct,
            value = (initData && initData.meta) ? initData.meta : undefined
        
        apiData.meta = getMeta(value) 

		da.initView(apiData, exports)(injectFuns)
        if(initData) {
            injectFuns.reduce('acceptFiles', initData, appInfo)
        }
	}
}

export function loadFiles(initData) {
    return injectFuns => {
        injectFuns.reduce('acceptFiles', initData)
    }
}
export function updateWebapiPath(imgInfo){
    return injectFuns=>{
        injectFuns.reduce('updateWebapiPath', imgInfo)
    }
}

export function del(index) {
    return injectFuns => {
        injectFuns.reduce('del',index)
    }
}

export function downLoad(enclosureId,orgId) {
    return injectFuns => {
        if(!orgId){
            injectFuns.formPost('/v1/web/tax/fileDownload', {enclosureId: enclosureId})
        }
        else{
            injectFuns.formPost('/v1/web/tax/fileDownloadOrgId', {enclosureId: enclosureId,orgId:orgId})
        }
    }
}

export function loading(isLoading) {
    return injectFuns => {
        injectFuns.reduce('loading', isLoading)
    }
}

/**
 * 上传成功事件处理
 * @param  {[type]} imgName [description]
 * @return {[type]}         [description]
 */
export function upload(accessory) {
    return injectFuns => {
		let {setMessage, getterByField} = da
        injectFuns.reduce('upload', accessory)
    }
}

export function getterByAjax(path, property, onSuccess) {
    return injectFuns => {
        let {post} = injectFuns,
            {getterByField, handleWebApiException} = da,
            {
                employeeDataSourceGetter,
                projectDataSourceGetter
            } = fun
        
        if(path == 'adjunct.adjunctList.ticketInfo.reimbursementer') {
            employeeDataSourceGetter(injectFuns, onSuccess)
        } else if(path == 'adjunct.adjunctList.ticketInfo.project') {
            projectDataSourceGetter(injectFuns, onSuccess)
        }
    }
}

export function onOk(cb) {
    return injectFuns => {
        let {handleWebApiInfo, getterByField} = da,
            {post, reduce} = injectFuns,
            form = getterByField('form')(injectFuns),
            fileList = getterByField('fileList')(injectFuns),
            ret = {}
         
        ret.form = form
        ret.fileList = fileList

        cb({result: true, value: ret})
    }
}

export function getter(path, propertys) {
    return injectFuns => {
        let ret = da.getter(path, propertys)(injectFuns),
            {setValue} = fun
        
//        if() {
//        } else {
            return ret
//        }
    }
}

function getMeta(value) {
    let meta = {
        name:'adjunct',
        component:'DynamicPage',
        childrens:[{
            name:'adjunctList',
            component:'Form',
            childrens:[{
                name:'files',
                component:'Grid',
                rowHeight:40,
                enableSequenceColumn:false, //序号列默认为true
                bindField:'fileList',
                childrens:[{
                    name:'suffix',
                    title:'附件列表',
                    displayComponent:'showIcon',
                    type:'string',
                    bindField: 'fileList.{0}',
                    isOEM:false,
                    flexGrow:1,
//                    width:190,
//                    height:50
                }]
            }, {
				name:'uploadFiles',
                className: 'loadFiles',
				component:'FormItems',
				childrens:[{
					name: 'otherFiles',
					title: '',
					type: 'int',
					component: 'Link',
					bindField: 'form.otherFiles',
					after: 'uploadImage'
				}]
			}]
		}]
    }
    
    if(value) {
        meta.childrens[0].childrens.push(value)
    }
    
    return meta
}


Object.assign(exports, {...da, ...exports})