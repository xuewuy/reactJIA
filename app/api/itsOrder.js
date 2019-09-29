export function existsUnpaidOrder(post,params){
    return post('/v1/itsorder/existsUnpaidOrder',params)
}

export function onlineBuy(post,params){
    return post('/v1/itsorder/onlineBuy',params)
}

export function createOnlineOrder(post,params){
    return post('/v1/itsorder/createOnlineOrder',params)
}

export function queryOnlineOrderList(post,params){
    return post('/v1/itsorder/queryOnlineOrderList',params)
}