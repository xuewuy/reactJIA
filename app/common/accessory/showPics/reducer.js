import * as dr from 'dynamicReducer'
import {fromJS,Map, List} from 'immutable'

export function delImage(state, item){
	if(item.get('id')){
		let {delRow, getterByField, setterByField} = dr

		state = delRow(state, 'root.album', o=>o.get('id') == item.get('id'))

		let position = getterByField(state, 'slidePosition'),
			album = getterByField(state, 'album'),
			size = album.size || 0

		if(position > size -1 ){
			position = size -1 < 0 ? 0 : size -1
			state = changeSlidePosition(state, 0)
			state = setterByField(state, 'current', album.get(0))
		}
	}

	return state
}

export function selectImage(state, item){
	let {getterByField, setterByField} = dr,
		album = getterByField(state, 'album'),
		showImage = album.find(o=>o.get('id') == item.get('id')),
		currentIndex
	album.map((element, index) => {
		if(element.get('id') == item.get('id')) {
			currentIndex = index
		}
	})
	state = setterByField(state, 'currentIndex', currentIndex)

	state = setterByField(state, 'current', showImage)
	return state
}

export function changeSlidePosition(state, position){
	let {setterByField} = dr
	state = setterByField(state, 'slidePosition', position)
	return state
}

export function showAroundPics(state, comingPic) {
	let album = dr.getterByField(state, 'album'),
		currentIndex = dr.getterByField(state, 'currentIndex')
	if(comingPic == 'prev') {
		if(currentIndex == '0') {
			return state
		}else {
			state = dr.setterByField(state, 'current', album.get(currentIndex - 1))
			state = dr.setterByField(state, 'currentIndex', currentIndex - 1)
		}
	}else if(comingPic == 'next') {
		if(currentIndex == (album.size - 1)) {
			return state
		}else {
			state = dr.setterByField(state, 'current', album.get(currentIndex + 1))
			state = dr.setterByField(state, 'currentIndex', currentIndex + 1)
		}
	}
	return state
}

Object.assign(exports, {...dr,...exports})