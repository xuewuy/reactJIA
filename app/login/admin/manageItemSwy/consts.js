export const orderType = {
    xs: {id: 1, name: '线上订单'},
    xx: {id: 2, name: '线下订单'},
}

export const orderTypeArr = [
    {id: 1, name: '线上订单'},
    {id: 2, name: '线下订单'},
]

export const payType = {
    zfb: {
            id: 3, name: '支付宝'
        },
    wx: {
            id: 2, name: '微信支付'
        },
    xx: {
            id: 1, name: '线下支付'
        },
}

export const payTypeArr = [
    {id: 3, name: '支付宝'},
    {id: 2, name: '微信支付'},
    {id: 1, name: '线下支付'},
]

export const invoiceStatus = {
    wkj: {
            id: 2, name: '未开具'
        },
    yku: {
            id: 3, name: '已开具'
        },
    wxfp: {
            id: 1, name: '无需发票'
        }
}

export const invoiceStatusArr = [
    {id: 2, name: '未开具'},
    {id: 3, name: '已开具'},
    {id: 1, name: '无需发票'}
]

export const productName = {
    zjzj: {id: 1, name: '中级专家'},
    gjzj: {id: 2, name: '高级专家'},
}

export const productNameArr = [
    {id: 1, name: '中级专家'},
    {id: 2, name: '高级专家'},
]

export function selectInfo(initData, compareData) {
    let ret = {}
    initData.map(o => {
        if(o.id == compareData) {
            ret = o
        }
    })
    return ret
}


















