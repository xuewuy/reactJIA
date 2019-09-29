export const meta = {
    name: 'portal',
    childrens: [{
        name: 'menus',
        bindField: 'menus'
    }, {
        name: 'tabs',
        bindField: 'tabs'
    }, {
        name: 'currentTab',
        bindField: 'currentTab'
    }]
}

export const getMenus = () => {
    return [{
        id: 1,
        name: '首页',
        imageName: 'Home',
        requestUrl: 'apps/welcome'
    },
   
    /*以下是企业端菜单*/
    //以下是新的菜单整理
    {
        id:2,
        name:'nav1',
        imageName: 'Fapiaoguanli'
    },{
        id:3,
        name:'nav2',
        imageName: 'FinishingNote'
       
    },{
        id: 4,
        name: 'nav3',
        imageName: 'Finance'
    },{
        id: 5,
        name: 'nav4',
        imageName: 'CustomerService',
        
    },{
        id: 6,
        name: 'nav5',
        imageName: 'CaiWuFenXi',
      
    },{
        id:8,
        name:'nav7',
        imageName: 'BossClient'
      
    },{
        id: 9,
        name: 'nav8',
        imageName: 'SystemSetting',
    }]
}


export function getData() {
    return {
        showMenu: true,
        popMenu: true,
        menus: [],
        tabs: [],
        currentTab: { title: '首页', url: 'apps/welcome' },
        orgs: [],
        currentOrg: undefined,
        orgSearchValue: '',
        disableMenus: undefined,//第三方接入时保存禁用项信息
        appInfo: undefined//第三方接入时保存第三方信息
    }
}

export function getOrgs(post) {
    return post("rap-user/org/query", {})
}


export function logout(post) {
    return post("rapuser/logout", {})
}


export function changeOrg(post, orgId) {
    return post("rapuser/org/switch", {
        id: orgId
    })
}

export function init(post, orgId, isServiceProvider, dzOrgId) {
    return post('v1/web/portal/init', {
        orgId, 'dzOrgId': dzOrgId, 'isServiceProvider': isServiceProvider
    })
}