/**
 * Create by zhaoq on 16/10/8.
 */

import * as dr from 'dynamicReducer'
import {List, fromJS, Map} from 'immutable'

export function acceptFiles(state, initData, appInfo) {
	if (!initData) {
		state = dr.setterByField(state, 'fileList', List())
		return  showFilesIcon(state)
	}
    if(initData.info) {
        state = dr.setterByField(state, 'info', fromJS(initData.info))
    }
    if(initData.meta) {
        if(initData.meta.name == 'ticketInfo') {
            state = dr.setter(state, 'adjunct.adjunctList.files.suffix', 'title', initData.info.title)
            state = dr.setter(state, 'adjunct.adjunctList.files.status', 'visible', true)
        }
    }
    if(initData.other) {
        state = dr.setterByField(state, 'other', fromJS(initData.other))
    }
    if(initData.form) {
        state = dr.setterByField(state, 'form', fromJS(initData.form))
    }
	if(!dr.getterByField(state, 'form.isReLoad')) {
		state = showFilesIcon(state)
		state = dr.setterByField(state, 'form.isReLoad', true)
		return state
	}
    let fileList = List()
    initData.album.map((element, index) => {
        element=Map.isMap(element)?element:fromJS(element)
        fileList = fileList.push(fromJS({
            src: '/v1/img/' + element.get('name'),
            name:element.get('name'),
            id:element.get('enclosureId') || element.get('id'),
            displayName:element.get('displayName'),
            fileSize:parseInt(element.get('fileSize')),
            suffix:element.get('suffix'),
            fileType:element.get('fileType') ? element.get('fileType').toString() : undefined,
            discardId: element.get('id'),
            ts:element.get('ts'),
            status:element.get('status'),
            statusId:element.get('statusId'),
        }))
    })

    if(appInfo && appInfo.id != '100'){
        state = dr.setter(state, 'adjunct.adjunctList.files.suffix','isOEM',true)
    }else{
        state = dr.setter(state, 'adjunct.adjunctList.files.suffix','isOEM',false)
    }

    state = dr.setterByField(state, 'fileList', fileList)
    state = showFilesIcon(state)
    return state
}

export function del(state,index) {
    let files = dr.getterByField(state,'fileList').remove(index)

    state = dr.setterByField(state,'fileList',files)
	state = dr.setterByField(state, 'form.isReLoad', false)
    return state
}

export function updateWebapiPath(state,imgInfo){
    let files = dr.getterByField(state, 'fileList').remove(0),
        webapiPath = dr.getterByField(state, 'other.webapiPath')
    state = dr.setterByField(state, 'fileList', files)
    state = dr.setterByField(state, 'other.webapiPath', `${webapiPath}&oldName=${imgInfo.get('name')}`)
    return state
}

/**
 * 上传成功更新状态
 * @param  {[type]} state     [description]
 * @param  {[type]} imageName [description]
 * @return {[type]}           [description]
 */
export function upload(state, fileInfo){
    
    let fileList = dr.getterByField(state, 'fileList'),
        onlyOne = dr.getterByField(state, 'other.onlyOne')
    
    if(onlyOne) {
        fileList = List()
    }

    fileList = fileList.filter((element, index) => {
        if(element.get('isLoading')) {
            return false
        }
        return true
    })
    if(fileInfo){
        fileList = fileList.push(fromJS({
	        src: '/v1/img/' + fileInfo.newName,
	        name:fileInfo.newName,
	        id:fileInfo.id,
	        displayName:fileInfo.oldName,
	        fileSize:parseInt(fileInfo.elSize),
	        suffix:fileInfo.elSuffix,
	        fileType:fileInfo.elType ? fileInfo.elType.toString() : undefined,
	        ts:fileInfo.tslong
	    }))
    }

    state = dr.setterByField(state, 'fileList', fileList)
	state = dr.setterByField(state, 'form.isReLoad', false)
	return state
}

export function loading(state, isLoading) {
    let fileList = dr.getterByField(state, 'fileList')
    fileList = fileList.push(fromJS({
        isLoading: true
    }))
    state = dr.setterByField(state, 'fileList', fileList)
    return state
}

export function showFilesIcon(state) {
    let fileList = dr.getterByField(state, 'fileList')
    fileList.map((element, index) => {
        state = dr.setter(state, 'adjunct.adjunctList.files.suffix,' + index, 'className', element.get('suffix') ? element.get('suffix').split('.')[1] : undefined)
    })
    return state
}

export function onFieldChange(state, path, oldValue, newValue) {
    if(path == 'adjunct.adjunctList.ticketInfo.isProject') {
        state = dr.setterByField(state, 'form.isProject', newValue)
        state = dr.setter(state, 'adjunct.adjunctList.ticketInfo.project', 'visible', newValue)
    } else {
        state = dr.onFieldChange(state, path, oldValue, newValue)
    }
    return state
}

Object.assign(exports,{...dr, ...exports})
