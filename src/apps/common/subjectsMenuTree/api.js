import md5 from 'md5'

export const meta = {
    name: 'subjectsMenuTree',
    component: 'Form',
    childrens: [{
        name: 'menuTree',
        component: 'Tree',
        bindField: 'subjectsClassified',
        checkedKeysPath: 'deptCheckedKeys',
        selectedKeysPath: 'deptSelectedKeys',
        expandedKeysPath:'deptExpandedKeys',
        enableToggle:true,
        displayMember: 'name',
        valueMember: 'id',
        childrenMember: 'subjectsClassifiedChildren',
        checkable: false,
        showLine: true,
        defaultExpandAll: false
    }]
}
// 2.2【2007企业会计准则】下预置：资产、负债、共同、权益、成本、损益等六大类；
// 2.3【2013小企业会计准则】下预置：资产、负债、权益、成本、损益等五大类；
// '18', '企业会计准则2007'
// '19','小企业会计准则2013'
export const data = {
    subjectsClassified:[{
        id:'资产',
        name:'资产',
    },{
        id:'负债',
        name:'负债',
    }
    // ,{
    //     id:'共同',
    //     name:'共同',
    // }
    ,{
        id:'权益',
        name:'权益',
    },{
        id:'成本',
        name:'成本',
    },{
        id:'损益',
        name:'损益',
    }],
    deptCheckedKeys:'',
    deptSelectedKeys:'',
    deptExpandedKeys:null,
    value:'',
    selectedCodeAndName:'',
    checkCodeAndName:'',
    checkable:''
}
