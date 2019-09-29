export function queryByHostname(post,appDomain){
    return post('/v1/app/queryByHostname',{appDomain})
}


export function getAll(post, list){
    return post('/v1/app/getAll', list)
}