export function init() {
    return {
        then: (cb)=> {
            cb({
                result: true,
                value: true
            })
        }
    }
}
export function getMeta() {
    return {
        name: 'importCover',
        component: 'Form',
        childrens: [
            {
                name: 'fromItems',
                component: 'FormItems',
                childrens: [{
                    name: 'businessUser',
                    component: 'Select',
                    title: '手机号',
                    type: 'string',
                    bindField: 'businessUser',
                    valueMember: 'id',
                    // displayMember: 'name',
                    displayMember: 'showStr',
                    filterOptionExpressions: 'showStr',
                    // allowClear:true,
                    showSearch: true,
                    dataSource:[
                        
                    ],
                    // width: 165,
                    width: 250,
                    height: 28
                },
                {
                    name: 'businessItem',
                    component: 'Select',
                    title: '企业列表',
                    type: 'string',
                    bindField: 'businessItem',
                    valueMember: 'id',
                    // disabled: true,
                    // displayMember: 'name',
                    displayMember: 'name',
                    filterOptionExpressions: 'name',
                    // allowClear:true,
                    showSearch: true,
                    dataSource:[
                        
                    ],
                    width: 250,
                    height: 28
                }
                
                ]
            }
        ]
    }
}
export function getData() {
    return {
        form: {
            
        }
    }

}


