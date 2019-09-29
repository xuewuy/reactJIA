/**
 * 会计期初余额api接口
 */

/**
* 查询期初余额
* @param	currentYear	查询年度
* @param	accountTypeId	  科目类型id(可选)
* @param	isQuantityCalc	是否数量核算(可选)
* @param	isMultiCalc	    是否外币核算(可选)
* @returns {*}
*/
export function init(post, accountTypeId, currentYear, isQuantityCalc, isMultiCalc){
   return post('/v1/accountPeriodBegin/init',
               {
                 accountTypeId: accountTypeId,
                 currentYear: currentYear,
                 isQuantityCalc: isQuantityCalc,
                 isMultiCalc: isMultiCalc
               })
}

/**
* 查询期初余额
* @param	orgId	组织机构id
* @param	accountTypeId	  科目类型id(可选)
* @returns {*}
*/
export function query(post, currentYear, accountTypeId){
   return post('/v1/accountPeriodBegin/query', {currentYear:currentYear, accountTypeId:accountTypeId})
}

/**
* 新增期初余额
* @param	list	科目余额列表
* @returns {*}
*/
export function addBatch(post, list){
   return post('/v1/accountPeriodBegin/createBatch', list)
}

/**
* 更新期初余额
* @param	list	科目余额列表
* @returns {*}
*/
export function updateBatch(post, list){
   return post('/v1/accountPeriodBegin/updateBatch', list)
}

/**
* 删除期初余额
* @param	id	            期初余额id
* @param	selectedYear	  界面选中年度
* @returns {*}
*/
export function deleteBalance(post, id, selectedYear){
   return post('/v1/accountPeriodBegin/delete', {id: id, currentYear: selectedYear})
}

/**
* 保存期初余额 通过id判判断，有id的进行更新，无id进行新增
* @param	list 科目余额列表
* @returns {*}
*/
export function createAndUpdateBatch(post, list){
   return post('/v1/accountPeriodBegin/createAndUpdateBatch', list)
}

/**
* 期初余额试算平衡
* @param	currentYear	  当前年度
* @returns {*}
*/
export function getAccountBeginBalanceDrCr(post, currentYear){
   return post('/v1/accountPeriodBegin/getAccountBeginBalanceDrCr', {currentYear: currentYear})
}

/**
* 查询当前组织是否存在期初
* @returns {*}
*/
export function haveAccountPeriodBegin(post){
   return post('/v1/accountPeriodBegin/haveAccountPeriodBegin')
}

/**
* 期初余额中的[调整]按钮是否可见
* @returns {*}
*/
export function isResetButtonVisible(post){
   return post('/v1/accountPeriodBegin/isResetButtonVisible')
}

/**
 * 期初余额下载导入模板
 * @returns {*}
 */
export function exportTemplate(post,filename){
    return post('/v1/accountPeriodBegin/exporttemplate', {filename:filename})
}

/**
 * 期初余额 待抵扣进项税额期初 查询接口
 * @returns {*}
 */
export function periodBeginQuery(post){
    return post('/v1/InputTaxDeduct/periodBeginQuery')
}

/**
 * 期初余额 待抵扣进项税额期初 增删改接口
 * @param
     {	"rowStatus":1, --行状态 0未改变，1新增，2修改，3删除
        "voucherDate":"2017-06-01", --入账日期
        "code":"001", --凭证号
        "summary":"期初进行税额", --摘要
        "amount":1000.32, --待抵扣进项税额
        "isPeriodBeginDeduct":0 --是否启用前已转出（2017年1月至2017年4月已转出）
     }
 * @returns {*}
 */
export function save(post,list){
    return post('/v1/InputTaxDeduct/save',list)
}