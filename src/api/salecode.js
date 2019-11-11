export function querySalecodeList(post,obj){
    return post('/v1/salecode/querySalecodeList',obj)
}

export function queryProduct(post){
    return post('/v1/salecode/queryProduct',{})
}

export function getSalecode(post,obj){
    return post('/v1/salecode/getSalecode',obj)
}

export function insertSalecode(post,obj){
    return post('/v1/salecode/insertSalecode',obj)
}

export function deleteSalecode(post,obj){
    return post('/v1/salecode/deleteSalecode',obj)
}

export function queryById(post,id){
    return post('/v1/salecode/queryById',{id:id})
}

export function updateSalecode(post,obj){
    return post('/v1/salecode/updateSalecode',obj)
}