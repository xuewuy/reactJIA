import moment from 'moment'
let currentTime = moment().get('year') + '-' + (moment().get('month')+1)+'-'+(moment().get('day'))
export function getMeta() {
    return {
        name: 'root',
        component: 'DynamicPage',
        childrens: [{
            name: 'list',
            component: 'AntGrid',
            bindField: 'list',
            rowHeight: 30,
            disabled: true,
            useValueGetter:false,
            width: true,
           /*mergeCells: [   //根据服务端数据,动态计算
                {row: [0,6], col: [0]},
                {row: [0,2], col: [1]},
                {row: [3], col: [1,2]},
                {row: [4,5], col: [1]},
                {row: [6], col: [1,2]},
                {row: [7], col: [0,2]},
                {row: [7], col: [0,1]}
            ],*/
            childrens: [/*{
                name: 'department',
                title: '部门',
                type: 'string',
                disabled: true,
                bindField: 'list.{0}.departmentname'
            }, {
                name: 'project',
                title: '项目',
                type: 'string',
                disabled: true,
                bindField: 'list.{0}.projectname'
            }, {
                name: 'person',
                title: '职员',
                type: 'string',
                disabled: true,
                bindField: 'list.{0}.personname'
            },*//*{
                name: 'type',
                title: '类型',
                type: 'string',
                disabled: true,
                columnGroup: true,
                childrens:[{
                    name:'businessType',
                    title:'业务类型',
                    type:'string',
                    disabled:true,
                    bindField:'list.{0}.total'
                }],

            },*/{
                name: 'inCol',
                title: '收入',
                disabled: true,
                columnGroup: true,
                textAlign:'center',
                childrens: [{
                    name: 'inout0',
                    title: '租赁',
                    type: 'float',
                    disabled: true,
                    bindField: 'list.{0}.inout0',
                    width:80
                },{
                    name: 'inout1',
                    title: '销售',
                    type: 'float',
                    disabled: true,
                    bindField: 'list.{0}.inout1',
                    width:80
                },{
                    name: 'inout2',
                    title: '小计',
                    type: 'float',
                    disabled: true,
                    bindField: 'list.{0}.inout2',
                    width:80
                }]
            }, {
                name: 'outCol',
                title: '支出',
                type: 'string',
                disabled: true,
                columnGroup: true,
                textAlign:'center',
                childrens: [{
                    name: 'inout3',
                    title: '招待费',
                    type: 'float',
                    disabled: true,
                    bindField: 'list.{0}.inout3',
                    width:80
                },{
                    name: 'inout4',
                    title: '招待费',
                    type: 'float',
                    disabled: true,
                    bindField: 'list.{0}.inout4',
                    width:80
                },{
                    name: 'inout5',
                    title: '小计',
                    type: 'float',
                    disabled: true,
                    bindField: 'list.{0}.inout5',
                    width:80
                }]
            },{
                name:'profit',
                title: '收支差额',
                type: 'string',
                disabled: true,
                textAlign:'right',
                bindField: 'list.{0}.profit',
                width:80

            },{
                name:'tax',
                title: '税额',
                type: 'string',
                disabled: true,
                textAlign:'right',
                bindField: 'list.{0}.tax',
                width:80

            },{
                name:'pre',
                title: '收入/支出',
                type: 'string',
                disabled: true,
                textAlign:'right',
                bindField: 'list.{0}.pre',
                width:80

            }]
        }]
    }
}
export const getMobileData = {

        profit:undefined,
        pre:undefined,
        inCol:{
            total:'12,000.00',
            childrens:[{
                subject:'销售收入',
                value:'12,000.00'
            },{
                subject:'利息收入',
                value:'1,200.00'
            }]
        },
        outCol:{
            total:'720,000.00',
            childrens:[{
                subject:'招待费',
                value:'12,000.00'
            }]
        },
        queryParams:{
            shareFileToken : getSearch().shareFileToken
        },
        date:{
            begindate:undefined,
            enddate:undefined
        }

}
export function getData() {
    return {
        list: [/*{
            department:'研发',
            project:'项目一',
            person:'张三',
            total:'100',
            pre:'0.25',
            profit:'100',
            inout0:'100',
            inout1:'100',
            inout2:'75',
            inout3:'175',
            inout4:'20',
            inout5:'30.5',
            inout6:'75',
            inout7:'100',
            inout8:'225.5'
        },{
            department:'研发',
            project:'项目一',
            person:'张三',
            profit:'100',
            pre:'0.25',
            total:'100',
            inout0:'100',
            inout1:'100',
            inout2:'75',
            inout3:'175',
            inout4:'20',
            inout5:'30.5',
            inout6:'75',
            inout7:'100',
            inout8:'225.5'
        },{
            department:'研发',
            project:'项目一',
            person:'张三',
            total:'100',
            profit:'100',
            pre:'0.25',
            inout0:'100',
            inout1:'100',
            inout2:'75',
            inout3:'175',
            inout4:'20',
            inout5:'30.5',
            inout6:'75',
            inout7:'100',
            inout8:'225.5'
        },{
            department:'研发',
            project:'项目一',
            person:'张三',
            profit:'100',
            total:'100',
            pre:'0.25',
            inout0:'100',
            inout1:'100',
            inout2:'75',
            inout3:'175',
            inout4:'20',
            inout5:'30.5',
            inout6:'75',
            inout7:'100',
            inout8:'225.5'
        },{
            department:'研发',
            project:'项目一',
            person:'张三',
            profit:'100',
            total:'100',
            pre:'0.25',
            inout0:'100',
            inout1:'100',
            inout2:'75',
            inout3:'175',
            inout4:'20',
            inout5:'30.5',
            inout6:'75',
            inout7:'100',
            inout8:'225.5'
        },{
            department:'研发',
            project:'项目一',
            person:'张三',
            profit:'100',
            total:'100',
            pre:'0.25',
            inout0:'100',
            inout1:'100',
            inout2:'75',
            inout3:'175',
            inout4:'20',
            inout5:'30.5',
            inout6:'75',
            inout7:'100',
            inout8:'225.5'
        },{
            department:'研发',
            project:'项目一',
            profit:'100',
            person:'张三',
            total:'100',
            pre:'0.25',
            inout0:'100',
            inout1:'100',
            inout2:'75',
            inout3:'175',
            inout4:'20',
            inout5:'30.5',
            inout6:'75',
            inout7:'100',
            inout8:'225.5'
        },{
            department:'研发',
            project:'项目一',
            profit:'100',
            person:'张三',
            total:'100',
            pre:'0.25',
            inout0:'100',
            inout1:'100',
            inout2:'75',
            inout3:'175',
            inout4:'20',
            inout5:'30.5',
            inout6:'75',
            inout7:'100',
            inout8:'225.5'
        }*/],
        queryParams:{
            shareFileToken : getSearch().shareFileToken
        },
        date:{
            begindate:undefined,
            enddate:undefined
        }


    }
}

function getSearch(){
    var search = window.location.search.slice(1)

    if(search.indexOf('?') != -1){
        search = search.split('?')[1]
    }

    var arr = search.split('&'),
        searchJson = {}
    for(var i=0; i<arr.length;i++){
        arr[i].split('=')
        searchJson[arr[i].split('=')[0]] = arr[i].split('=')[1]
    }
    return searchJson
}
export function init() {
    return {
        then: (cb) => {
            cb({
                result: true,
                value: true
            })
        }
    }
}
