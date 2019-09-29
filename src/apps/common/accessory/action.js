/**
 * Create by zhaoq on 16/10/8.
 */
import * as da from 'dynamicAction'
import * as api from './api'
import {Upload} from 'xComponent'
import Immutable, {List} from 'immutable'

export function initView(initData){
	return injectFuns =>{
		da.initView( api.accessory,exports)(injectFuns)
		if(initData) {
			injectFuns.reduce('showFiles',initData.album, initData.isEdit)
		}
	}
}

export function onEvent(eventName, option) {
	return injectFuns => {
		let {setMessage, clearMessage, getterByField} = da,
			picList = getterByField('picture')(injectFuns).toJS(),
			album = []
		picList.map((element, index) => {
			for(let i in element){
				album.push(element[i])
			}
		})
		if(album[album.length - 1].addBtn) {
			album.pop()
		}
		da.onEvent(eventName, option)(injectFuns)
		if(eventName == 'showPic') {
			let index = option.path.split(',')[1],
				path = option.path.split(',')[0],
				picNum = getterByField('allFiles')(injectFuns).size - 1,
				isEdit = getterByField('form.isEdit')(injectFuns),
				showIndex
			if(index == '0') {
				showIndex = parseInt(path.substr(path.length - 1)) - 1
			}else if(index == '1') {
				showIndex = parseInt(path.substr(path.length - 1)) + 4
			}
	        setMessage({
	            type: 'app',
	            title: '共' + picNum + '张图片：',
	            content: 'app:apps/common/accessory/showPics',
	            okText:'确定',
				refName: 'showPic',
	            initData: {album: album,isEdit: isEdit,showIndex: showIndex},
				width: 900,
				bodyStyle: {height: 500},
	            closable:true,
				wrapClassName:'showPics',
	            onCancel: ()=>{ clearMessage()(injectFuns)},
	            onOk: function(data) { 
	                clearMessage()(injectFuns)
					// if(data.result) {
						// injectFuns.reduce('initFiles', data.album)
					// }
	            }
	        })(injectFuns)			
		}else if(eventName == 'delPic') {
			let index = option.path.split(',')[1],
				path = option.path.split(',')[0],
				delPic = true
			del(index, path, delPic)(injectFuns)
		}else if(eventName == 'addPic') {
			upload(option)(injectFuns)
		}
	}
}

export function onOk(cb) {
	return injectFuns => {
		let filesList,
			picList = da.getterByField('allFiles')(injectFuns).toJS(),
			othersList = da.getterByField('otherFiles')(injectFuns).toJS()
		filesList = picList.filter((element) => {
			if(!element.addBtn){
				return true
			}else {
				return false
			}
		}).concat(othersList)
		filesList.map((element, index) => {
			if('isEdit' in element) {
				delete element.isEdit
			}
		})
		cb( {result:true, filesList:filesList} )
	}
}

export function del(index,path, delPic) {
    return injectFuns => {
        let {setMessage, clearMessage, getterByField} = da
        setMessage({
            type:'confirm',
            title:'警告',
            content:'您确定进行删除操作吗？',
            width:360,
            onCancel: () => { clearMessage()(injectFuns) },
            onOk: () => {
                clearMessage()(injectFuns)
                injectFuns.reduce('del',index,path, delPic)
            }
        })(injectFuns)
    }
}

/**
 * 上传成功事件处理
 * @param  {[type]} imgName [description]
 * @return {[type]}         [description]
 */
export function upload(imgName, otherFiles) {
    return injectFuns => {
		let {setMessage, getterByField} = da,
			picLength = getterByField('allFiles')(injectFuns).size - 1,
			otherFileLength = getterByField('otherFiles')(injectFuns).size
			
		if(picLength >= '10' && !otherFiles) {
			return setMessage({type:'error', mode: 'message', content:'最多上传10张图片'})(injectFuns)
		}else if(otherFileLength >= '10' && otherFiles) {
			return setMessage({type:'error', mode: 'message', content:'最多上传10个非图片格式附件'})(injectFuns)
		}
			
        injectFuns.reduce('upload', imgName, otherFiles)
    }
}

Object.assign(exports, {...da, ...exports})