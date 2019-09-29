export function checkIsUpgrade(post){
    return post('/v1/SetOrg/checkIsUpgrade',{})
}

export function checkUpgrade(post,obj){
    return post('/v1/SetOrg/checkUpgrade',obj)
}

export function upgrade(post,obj){
    return post('/v1/SetOrg/upgrade',obj)
}