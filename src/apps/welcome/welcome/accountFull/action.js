/**
 * Created by shenxy on 16/8/26.
 */
import * as da from 'dynamicAction'
import * as api from './api'
import { List, fromJS } from 'immutable'
import webapi from 'webapi'
import moment from 'moment'

export function initView(initData) {
    return injectFuns => {
        let data = api.getData(),
            { handleWebApiInfo } = da, { post, reduce } = injectFuns
        da.initView(data, exports)(injectFuns)
    }
}


Object.assign(exports, {...da, ...exports})
