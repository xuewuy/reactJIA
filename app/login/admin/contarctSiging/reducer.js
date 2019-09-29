import * as dr from 'dynamicReducer'
/**
 * [setSaleCode 监听优惠码发生更改，把所有的小写字母强制转换为大写]
 * @param {[type]} state    [description]
 * @param {[type]} newValue [description]
 */
export function setSaleCode(state,newValue){
    return dr.setterByField(state,'form.saleCode',newValue.toUpperCase())
}

/**
 * [onFieldFocus 清空焦点]
 * @param  {[type]} state [description]
 * @param  {[type]} path  [description]
 * @return {[type]}       [description]
 */
export function onFieldFocus(state, path) {
    state = dr.clearValidate(state, path)
    return dr.onFieldFocus(state, path)
}


export function setProductPrice(state,newValue){
    let productPrice = newValue.get('price'),
        promotionPrice = newValue.get('promotionPrice')
    state = dr.setterByField(state,'form.productPrice',productPrice)
    state = dr.setterByField(state,'form.promotionPrice',promotionPrice)
    state = dr.setterByField(state,'form.productName',newValue)
    return state
}


Object.assign(exports,{...dr, ...exports})