export function getMeta(){
	return {
		name:'root',
		component:'Layout',
		childrens:[
			getHeaderMeta(),
			getContentMeta()
		]
	}
}

export function getHeaderMeta(){
	return {
		name:'header',
		component:'Layout',
		direction:'row',
		height:60,
		childrens:[
			getHeaderLeftMeta(),
			getHeaderRightMeta()
		]
	}
}

export function getHeaderLeftMeta(){
	return {
		name:'headerLeft',
		component:'Layout',
		width:300,
		childrens:[{
			name: 'yearMonthCondition',
            component:'MonthPicker',
            bindField: 'form.yearMonthCondition',
            width:150,
            className:'richardticketlist-yearMonthCondition'
		}]
	}
}

export function getHeaderRightMeta(){
	return {
		name:'headerRight',
		component:'Layout',
		childrens:[{
			name:'deleteButton',
			component:'Button',
			width:150,
			height:30,
			title:'删除'
		}]
	}
}

export function getContentMeta(){
	return {
		name:'content',
		component:'Layout'
	}
}