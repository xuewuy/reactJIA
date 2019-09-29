import moment from 'moment'
export const meta = {
    name: 'editClient',
    component: 'Form',
    childrens: [{
        name: 'TAB1',
        title: '基本信息',
        component: 'FormItems',
        childrens: [{}]
    }]
}

export const data = {
    from:{
        status:'001'
    }
}
