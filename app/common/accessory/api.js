/**
 * Create by zhaoq on 16/10/8.
 */
'use strict';

const initData = {
    picture:[{
        picCol0:{addBtn:true}
    }],
	allFiles:undefined,
    otherFiles:[],
	form:{
		isEdit:undefined,
		otherFiles:undefined
	}
}
export const accessory = {
    meta: {
        name:'accessory',
        component:'DynamicPage',
        childrens:[{
            name:'picture',
            component:'Form',
            childrens:[{
                name:'pic',
                component:'Grid',
                enableSequenceColumn:false, //序号列默认为true
                bindField:'picture',
                childrens:[{
                    name:'picCol1',
                    displayComponent:'Picture',
                    bindField: 'picture.{0}.picCol0',
                    flexGrow: 1,
                    height:120
                },{
                    name:'picCol2',
                    displayComponent:'Picture',
                    bindField: 'picture.{0}.picCol1',
                    flexGrow: 1,
                    height:120
                },{
                    name:'picCol3',
                    displayComponent:'Picture',
                    bindField: 'picture.{0}.picCol2',
                    flexGrow: 1,
                    height:120
                },{
                    name:'picCol4',
                    displayComponent:'Picture',
                    bindField: 'picture.{0}.picCol3',
                    flexGrow: 1,
                    height:120
                },{
                    name:'picCol5',
                    displayComponent:'Picture',
                    bindField: 'picture.{0}.picCol4',
                    flexGrow: 1,
                    height:120
                }]
            }]
        },{
            name:'otherFiles',
            component:'Form',
            childrens:[{
                name:'files',
                component:'Grid',
                enableSequenceColumn:false, //序号列默认为true
                bindField:'otherFiles',
                childrens:[{
                    name:'displayName',
                    title:'其他文件：',
                    type:'string',
                    flexGrow:1,
                    disabled:'true',
                    bindField: 'otherFiles.{0}.displayName',
					width: 500
                }]
            }, {
				name:'uploadFiles',
				component:'FormItems',
				childrens:[{
					name: 'otherFiles',
					title: '',
					type: 'int',
					component: 'Link',
					bindField: 'form.otherFiles',
					width: 150,
					after: 'uploadImage'
				}]
			}]
		}]
    },
    data: initData
}