import * as da from 'dynamicAction'
import Immutable, { Map } from 'immutable'
import * as api from './api'
import webapi from 'webapi'


/**
 * [初始化视图]
 * @return {[type]} [无返回值]
 */
export function initView(initData) {
    return injectFuns => {
        da.initView({ meta: api.meta, data: api.data }, exports)(injectFuns)
        let { handleWebApiInfo,getterByField } = da, { post, reduce, getContext } = injectFuns,
        isEndNode = initData.isEndNode || undefined
        webapi.account.query(post, getContext().currentOrg.id, undefined, isEndNode).then(data => {
            if (!handleWebApiInfo(data)(injectFuns)) return
            if(initData.value){
                let fullSubjects = getFullSubjects(data.value, initData.industry)(injectFuns),
                    defaultExpandedKeys = false
                fullSubjects.map((element,index)=>{
                    let isTrue = false
                    element.subjectsClassifiedChildren.map((subject,index)=>{
                        if(subject.id == initData.value.id){
                            return isTrue = true
                        }
                    })
                    if(isTrue){
                        return defaultExpandedKeys = element.id
                    }
                })
                return reduce('setView', getFullSubjects(data.value, initData.industry)(injectFuns), initData,data.value,defaultExpandedKeys)
            }
            reduce('setView', getFullSubjects(data.value, initData.industry)(injectFuns), initData,data.value)
        })
    }
}

/**
 * 获取完整的全部科目
 * @return {[type]} [description]
 */
export function getFullSubjects(data,industry) {
    return injectFuns => {
        let subjectsClassified = getSubjectsClassified(industry)(injectFuns)
        if (data.length <= 0) {
            subjectsClassified = [{
                id: 'm',
                name: '没有找到相应的科目'
            }]
            return subjectsClassified
        }
        data.map((element, index) => {
            if (injectFuns.getContext().currentOrg.accountingStandards == 18) {
                // '18', '企业会计准则2007'
                if(industry==1005) {
                    if (element.accountTypeId == '88') {
                        if (!subjectsClassified[0].subjectsClassifiedChildren) {
                            subjectsClassified[0].subjectsClassifiedChildren = [{
                                id: element.id,
                                name: element.codeAndName
                            }]
                        } else {
                            subjectsClassified[0].subjectsClassifiedChildren.push({
                                id: element.id,
                                name: element.codeAndName
                            })
                        }
                    } else if (element.accountTypeId == '89') {
                        if (!subjectsClassified[1].subjectsClassifiedChildren) {
                            subjectsClassified[1].subjectsClassifiedChildren = [{
                                id: element.id,
                                name: element.codeAndName
                            }]
                        } else {
                            subjectsClassified[1].subjectsClassifiedChildren.push({
                                id: element.id,
                                name: element.codeAndName
                            })
                        }
                    } else if (element.accountTypeId == '91') {
                        if (!subjectsClassified[2].subjectsClassifiedChildren) {
                            subjectsClassified[2].subjectsClassifiedChildren = [{
                                id: element.id,
                                name: element.codeAndName
                            }]
                        } else {
                            subjectsClassified[2].subjectsClassifiedChildren.push({
                                id: element.id,
                                name: element.codeAndName
                            })
                        }
                    } else if (element.accountTypeId == '93') {
                        if (!subjectsClassified[3].subjectsClassifiedChildren) {
                            subjectsClassified[3].subjectsClassifiedChildren = [{
                                id: element.id,
                                name: element.codeAndName
                            }]
                        } else {
                            subjectsClassified[3].subjectsClassifiedChildren.push({
                                id: element.id,
                                name: element.codeAndName
                            })
                        }
                    }
                } else {

                    if (element.accountTypeId == '88') {
                        if (!subjectsClassified[0].subjectsClassifiedChildren) {
                            subjectsClassified[0].subjectsClassifiedChildren = [{
                                id: element.id,
                                name: element.codeAndName
                            }]
                        } else {
                            subjectsClassified[0].subjectsClassifiedChildren.push({
                                id: element.id,
                                name: element.codeAndName
                            })
                        }
                    } else if (element.accountTypeId == '89') {
                        if (!subjectsClassified[1].subjectsClassifiedChildren) {
                            subjectsClassified[1].subjectsClassifiedChildren = [{
                                id: element.id,
                                name: element.codeAndName
                            }]
                        } else {
                            subjectsClassified[1].subjectsClassifiedChildren.push({
                                id: element.id,
                                name: element.codeAndName
                            })
                        }
                    } else if (element.accountTypeId == '91') {
                        if (!subjectsClassified[2].subjectsClassifiedChildren) {
                            subjectsClassified[2].subjectsClassifiedChildren = [{
                                id: element.id,
                                name: element.codeAndName
                            }]
                        } else {
                            subjectsClassified[2].subjectsClassifiedChildren.push({
                                id: element.id,
                                name: element.codeAndName
                            })
                        }
                    } else if (element.accountTypeId == '92') {
                        if (!subjectsClassified[3].subjectsClassifiedChildren) {
                            subjectsClassified[3].subjectsClassifiedChildren = [{
                                id: element.id,
                                name: element.codeAndName
                            }]
                        } else {
                            subjectsClassified[3].subjectsClassifiedChildren.push({
                                id: element.id,
                                name: element.codeAndName
                            })
                        }
                    } else if (element.accountTypeId == '93') {
                        if (!subjectsClassified[4].subjectsClassifiedChildren) {
                            subjectsClassified[4].subjectsClassifiedChildren = [{
                                id: element.id,
                                name: element.codeAndName
                            }]
                        } else {
                            subjectsClassified[4].subjectsClassifiedChildren.push({
                                id: element.id,
                                name: element.codeAndName
                            })
                        }
                    }
                }
                //  else if (element.accountTypeId == '90') {
                //     if (!subjectsClassified[2].subjectsClassifiedChildren) {
                //         subjectsClassified[2].subjectsClassifiedChildren = [{
                //             id: element.id,
                //             name: element.codeAndName
                //         }]
                //     } else {
                //         subjectsClassified[2].subjectsClassifiedChildren.push({
                //             id: element.id,
                //             name: element.codeAndName
                //         })
                //     }
                // } else if (element.accountTypeId == '91') {
                //     if (!subjectsClassified[3].subjectsClassifiedChildren) {
                //         subjectsClassified[3].subjectsClassifiedChildren = [{
                //             id: element.id,
                //             name: element.codeAndName
                //         }]
                //     } else {
                //         subjectsClassified[3].subjectsClassifiedChildren.push({
                //             id: element.id,
                //             name: element.codeAndName
                //         })
                //     }
                // } else if (element.accountTypeId == '92') {
                //     if (!subjectsClassified[4].subjectsClassifiedChildren) {
                //         subjectsClassified[4].subjectsClassifiedChildren = [{
                //             id: element.id,
                //             name: element.codeAndName
                //         }]
                //     } else {
                //         subjectsClassified[4].subjectsClassifiedChildren.push({
                //             id: element.id,
                //             name: element.codeAndName
                //         })
                //     }
                // } else if (element.accountTypeId == '93') {
                //     if (!subjectsClassified[5].subjectsClassifiedChildren) {
                //         subjectsClassified[5].subjectsClassifiedChildren = [{
                //             id: element.id,
                //             name: element.codeAndName
                //         }]
                //     } else {
                //         subjectsClassified[5].subjectsClassifiedChildren.push({
                //             id: element.id,
                //             name: element.codeAndName
                //         })
                //     }
                // }

            }
            if (injectFuns.getContext().currentOrg.accountingStandards == 19) {
                // '19','小企业会计准则2013'
                if(industry==1005) {
                    if (element.accountTypeId == '88') {
                        if (!subjectsClassified[0].subjectsClassifiedChildren) {
                            subjectsClassified[0].subjectsClassifiedChildren = [{
                                id: element.id,
                                name: element.codeAndName
                            }]
                        } else {
                            subjectsClassified[0].subjectsClassifiedChildren.push({
                                id: element.id,
                                name: element.codeAndName
                            })
                        }
                    } else if (element.accountTypeId == '89') {
                        if (!subjectsClassified[1].subjectsClassifiedChildren) {
                            subjectsClassified[1].subjectsClassifiedChildren = [{
                                id: element.id,
                                name: element.codeAndName
                            }]
                        } else {
                            subjectsClassified[1].subjectsClassifiedChildren.push({
                                id: element.id,
                                name: element.codeAndName
                            })
                        }
                    } else if (element.accountTypeId == '91') {
                        if (!subjectsClassified[2].subjectsClassifiedChildren) {
                            subjectsClassified[2].subjectsClassifiedChildren = [{
                                id: element.id,
                                name: element.codeAndName
                            }]
                        } else {
                            subjectsClassified[2].subjectsClassifiedChildren.push({
                                id: element.id,
                                name: element.codeAndName
                            })
                        }
                    } else if (element.accountTypeId == '93') {
                        if (!subjectsClassified[3].subjectsClassifiedChildren) {
                            subjectsClassified[3].subjectsClassifiedChildren = [{
                                id: element.id,
                                name: element.codeAndName
                            }]
                        } else {
                            subjectsClassified[3].subjectsClassifiedChildren.push({
                                id: element.id,
                                name: element.codeAndName
                            })
                        }
                    }
                } else {

                    if (element.accountTypeId == '88') {
                        if (!subjectsClassified[0].subjectsClassifiedChildren) {
                            subjectsClassified[0].subjectsClassifiedChildren = [{
                                id: element.id,
                                name: element.codeAndName
                            }]
                        } else {
                            subjectsClassified[0].subjectsClassifiedChildren.push({
                                id: element.id,
                                name: element.codeAndName
                            })
                        }
                    } else if (element.accountTypeId == '89') {
                        if (!subjectsClassified[1].subjectsClassifiedChildren) {
                            subjectsClassified[1].subjectsClassifiedChildren = [{
                                id: element.id,
                                name: element.codeAndName
                            }]
                        } else {
                            subjectsClassified[1].subjectsClassifiedChildren.push({
                                id: element.id,
                                name: element.codeAndName
                            })
                        }
                    } else if (element.accountTypeId == '91') {
                        if (!subjectsClassified[2].subjectsClassifiedChildren) {
                            subjectsClassified[2].subjectsClassifiedChildren = [{
                                id: element.id,
                                name: element.codeAndName
                            }]
                        } else {
                            subjectsClassified[2].subjectsClassifiedChildren.push({
                                id: element.id,
                                name: element.codeAndName
                            })
                        }
                    } else if (element.accountTypeId == '92') {
                        if (!subjectsClassified[3].subjectsClassifiedChildren) {
                            subjectsClassified[3].subjectsClassifiedChildren = [{
                                id: element.id,
                                name: element.codeAndName
                            }]
                        } else {
                            subjectsClassified[3].subjectsClassifiedChildren.push({
                                id: element.id,
                                name: element.codeAndName
                            })
                        }
                    } else if (element.accountTypeId == '93') {
                        if (!subjectsClassified[4].subjectsClassifiedChildren) {
                            subjectsClassified[4].subjectsClassifiedChildren = [{
                                id: element.id,
                                name: element.codeAndName
                            }]
                        } else {
                            subjectsClassified[4].subjectsClassifiedChildren.push({
                                id: element.id,
                                name: element.codeAndName
                            })
                        }
                    }
                }                    
            }

        })
        return subjectsClassified
    }
}

/**
 * 获取科目分类信息
 * @return {[type]} [description]
 */
export function getSubjectsClassified(industry) {
    return injectFuns => {
        // 2.2【2007企业会计准则】下预置：资产、负债、共同、权益、成本、损益等六大类；
        // 2.3【2013小企业会计准则】下预置：资产、负债、权益、成本、损益等五大类；
        // '18', '企业会计准则2007'
        // '19','小企业会计准则2013'
        let subjectsClassified2007 = [{
                id: 'a',
                name: '资产',

            }, {
                id: 'b',
                name: '负债'
            }
            // , {
            //     id: 'c',
            //     name: '共同'
            // }
            , {
                id: 'd',
                name: '权益'
            }, {
                id: 'e',
                name: '成本'
            }, {
                id: 'f',
                name: '损益'
            }],
            subjectsClassified2013 = [{
                id: 'h',
                name: '资产',

            }, {
                id: 'i',
                name: '负债'
            }, {
                id: 'j',
                name: '权益'
            }, {
                id: 'k',
                name: '成本'
            }, {
                id: 'l',
                name: '损益'
            }],
            subjectsClassified = ''
        if( industry==1005 ) {
            subjectsClassified2007 = [{
                id: 'a',
                name: '资产',

            }, {
                id: 'b',
                name: '负债'
            }
            , {
                id: 'd',
                name: '权益'
            }, {
                id: 'f',
                name: '损益'
            }]
            subjectsClassified2013 = [{
                id: 'h',
                name: '资产',

            }, {
                id: 'i',
                name: '负债'
            }, {
                id: 'j',
                name: '权益'
            }, {
                id: 'l',
                name: '损益'
            }]
        }
        if (injectFuns.getContext().currentOrg.accountingStandards == 18) {
            subjectsClassified = subjectsClassified2007
        } else if (injectFuns.getContext().currentOrg.accountingStandards == 19) {
            subjectsClassified = subjectsClassified2013
        }


        return subjectsClassified
    }
}

export function onOk(cb) {
    return injectFuns => {
        let retData,
            isCheckable = da.getter('subjectsMenuTree.menuTree', 'checkable')(injectFuns)
        if (isCheckable) {
            let key = da.getterByField('deptCheckedKeys')(injectFuns).toJS(),
                codeAndName = da.getterByField('checkCodeAndName')(injectFuns).toJS()
                //在这里去去除掉分类节点
            retData = { key, codeAndName }
        } else {
			if(!da.getterByField('deptSelectedKeys')(injectFuns)) {
				retData = {}   //不选中树节点返回空值操作  add by zq 2016-12-28
			}else {
				let key = da.getterByField('deptSelectedKeys')(injectFuns).get(0),
					codeAndName = da.getterByField('selectedCodeAndName')(injectFuns),
					subjects = da.getterByField('subjects')(injectFuns),
					elementNode = ''
				for(let element of subjects){
					if(element.id == key){
						elementNode = element
					}
				}
				if (!isNaN(key)) { //如果选中分组,不用返回
					retData = { key, codeAndName, ...elementNode }
				}
			}
        }
        cb({ result: true, value: retData })
    }
}

Object.assign(exports, {...da, ...exports })
