/**
 * Create by zhaoq on 16/10/8.
 */

import * as dr from 'dynamicReducer'
import {List, fromJS, Map} from 'immutable'

export function del(state,index,path, delPic) {
	if(delPic) {
		let	album = dr.getterByField(state, 'picture').toJS(),
			isEdit = dr.getterByField(state, 'form.isEdit'),
			picList = [],delIndex
		album.map((element, index) => {
			for(let i in element) {
				picList.push(element[i])
			}
		})
		if(index == '0') {
			delIndex = parseInt(path.substr(path.length - 1)) - 1
		}else if(index == '1') {
			delIndex = parseInt(path.substr(path.length - 1)) + 4
		}
		picList.splice(delIndex, 1)
		state = initFiles(state, fromJS(picList), isEdit)
	}else {
		let delPath = path.split('.')[1] || '',
			files = dr.getterByField(state,delPath).remove(index)
		state = dr.setterByField(state,delPath,files)
	}
    return state
}

export function showFiles(state,value, isEdit) {
	let picList = [], otherFiles = []
	if(value) {
		value.map((element, index) => {
			if(element.fileType == "340000000000001") {
				picList.push(element)
			}else {
				otherFiles.push(element)
			}
		})
		if(isEdit) {
			picList.push({addBtn:true})
		}
		state = initFiles(state, fromJS(picList), isEdit)
		state = dr.setterByField(state, 'otherFiles', fromJS(otherFiles))
	}
	state = dr.setterByField(state, 'form.isEdit', isEdit)
	return state
}

/**
 * 上传成功更新状态
 * @param  {[type]} state     [description]
 * @param  {[type]} imageName [description]
 * @return {[type]}           [description]
 */
export function upload(state, fileInfo, otherFiles){
	if(otherFiles) {
		let otherFilesList = dr.getterByField(state, 'otherFiles')
		otherFilesList = otherFilesList.push(fromJS({
			src: '/v1/img/' + fileInfo.newName, 
			name:fileInfo.newName,
			id:fileInfo.id, 
			displayName:fileInfo.oldName,
			fileSize:parseInt(fileInfo.elSize), 
			suffix:fileInfo.elSuffix,
			fileType:fileInfo.elType.toString(),
			ts:fileInfo.tslong
		}))
		state = dr.setterByField(state, 'otherFiles', otherFilesList)
	}else {
		let	album = dr.getterByField(state, 'picture').toJS(),
			isEdit = dr.getterByField(state, 'form.isEdit'),
			picList = []
		album.map((element, index) => {
			for(let i in element) {
				picList.push(element[i])
			}
		})
		picList.splice(picList.length - 1, 0, {
			src: '/v1/img/' + fileInfo.newName, 
			name:fileInfo.newName,
			id:fileInfo.id, 
			displayName:fileInfo.oldName,
			fileSize:parseInt(fileInfo.elSize), 
			suffix:fileInfo.elSuffix,
			fileType:fileInfo.elType.toString(),
			ts:fileInfo.tslong
		})
		state = initFiles(state, fromJS(picList), isEdit)
	}
	return state
}

export function initFiles(state, allFiles, isEdit) {  
    let filesGrid = List(),
        i = 0,
        filesGridRow
    //把服务端返回的list, 转换成为每行5列的格式
    for (let file of allFiles) {
        if (i == 0) {
            filesGridRow = Map()
        }
		file = file.set('isEdit', isEdit)
        filesGridRow = filesGridRow.set('picCol' + i, file)
        if ((i + 1) % 5 == 0) {
            filesGrid = filesGrid.push(filesGridRow)
            filesGridRow = undefined
            i = 0
        }
        else {
            i++
        }
    }
    if (filesGridRow) {
        filesGrid = filesGrid.push(filesGridRow)
    }
    state = dr.setterByField(state, 'allFiles', allFiles)
	state = dr.setterByField(state, 'picture', filesGrid)
    return state
}


Object.assign(exports,{...dr, ...exports})