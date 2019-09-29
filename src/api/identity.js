export function query(post,obj){
    return post('v1/identity/queryBusLicensePathAndQRCode',obj)
}

export function upload(fromPost){
    return fromPost('fromPost')
}

export function deleteImg(post,str){
    return post(`/v1/accountsIdentity/delete?fileName=${str}`)
}