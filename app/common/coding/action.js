import * as da from 'dynamicAction'


/**
 * [初始化视图]
 * @return {[type]} [无返回值]
 */
export function initView() {
    return injectFuns => {
        let context = injectFuns.getContext(),
            appInfo = context.appInfo,
            appServiceTel = appInfo.appServiceTel
        da.initView({ meta: {}, data: { appServiceTel } }, exports)(injectFuns)
    }
}


Object.assign(exports, { ...da, ...exports })
