import * as da from 'dynamicAction'
import * as api  from './api'
import webapi from 'webapi'

export function initView(initData) {
    return injectFuns => { 
    	let {initView} = da,
    		data = {...api.data}

    	if(initData && initData.album){
    		data.album = initData.album
    		data.current = initData.album[initData.showIndex]
			data.currentIndex = initData.showIndex
//    		data.isEdit = !!initData.isEdit 	
    		data.isEdit = false 	
    	}
        initView({meta:api.meta, data}, exports)(injectFuns)

    }
}

// export function onOk(cb){
	// return injectFuns =>{
		// let {getterByField} = da,
			// album = getterByField('album')(injectFuns).toJS()

		// cb( {result:true, album} )
	// }
// }

export function delImage(item){
	return injectFuns=>{
		injectFuns.reduce('delImage',item)
	}
}

export function selectImage(item){
	return injectFuns=>{
		injectFuns.reduce('selectImage', item)
	}
}

export function changeSlidePosition(position){
	return injectFuns=>{
		injectFuns.reduce('changeSlidePosition', position)
	}
}


export function showAroundPics(comingPic) {
	return injectFuns => {
		injectFuns.reduce('showAroundPics', comingPic)
	}
}


Object.assign(exports, {...da,...exports})

