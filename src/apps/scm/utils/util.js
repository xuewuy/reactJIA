export function voudherIsReadonly(status, sourceVoucherTypeId){
    if(status === 3) //已审核
        return true
    if(sourceVoucherTypeId =='0' ){
        return true
    }
    
    return false
}