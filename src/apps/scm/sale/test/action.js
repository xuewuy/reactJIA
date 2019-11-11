import * as da from 'dynamicAction'
import * as api from './api'
import { fromJS, List, Map, is } from 'immutable'
import webapi from 'webapi'
import React from 'react'
import { Button, Notification } from 'xComponent'
import moment from "moment"

export function initView(initData) {
    return injectFuns => {
        let initVoucherData=null
        da.initView({
            meta: api.voucher.meta,
            data: {
                voucherData: initVoucherData
            }
        }, exports)(injectFuns)
    }
}
Object.assign(exports, {...da, ...exports})
