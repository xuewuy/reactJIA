import React, { ReactDOM } from 'react'
import webapi from 'webapi'
import Immutable, { fromJS, Map, List } from 'immutable'
import * as api from './api'
import * as da from 'dynamicAction'

export default function authActionCreator() {

    this.initAuthView = (o, params) => {
        if (!o) return
        let that = o
        //let { api } = params.data
        params.data.btnStatus = that.props.btnStatus
        params.data.pageId = that.props.pageId
        params.data.checkMenuBtn = that.props.onCheckMenuBtn
        params.data.btnHidden = this.setBtnPower(that.props.btnStatus, params.data.btnHiddenList, params.data.pageId) //通过api中的按钮权限列对象， 生成所有不显示的按钮
        return params.data
    }

    //初始化时，就把对应的按钮权限对照表，转化成是否按钮显示列表。然后存储，用到时取出即可，不用每次加载都算
    this.setBtnPower = (btnStatus, btnHiddenList, pageId) => {
        let obj = {}
        for (let key in btnHiddenList) {
            obj[key] = this.getAuthControl(key, btnHiddenList, btnStatus, pageId)
        }
        return obj
    }

    this.getAuthControl = (refs, btnHiddenList, btnStatus, pageId) => {
        // 201666是银行对账单的假ID(仅前台使用)，由于银行对账单菜单后台删除了，所以需要拿流水账的权限
        //201003是流水账列表的ID（由于银行对账单是放在流水账里的，所以使用流水账的权限）2018-05-08赵烁
        if (pageId == 201666) {
            pageId = 201003
        }
        //将查看时需隐藏的项列出来，以后需要修改，增加字段即可
        if (btnHiddenList[refs] === undefined || btnHiddenList[refs].length == 0) {
            // return true
            return undefined
        } else {
            let btnVisible = undefined
            // 由于各种情况下传进来的btnStatus不同，所以特殊处理下2017-09-18赵烁
            if (btnStatus && btnStatus.size) {
                btnStatus = btnStatus.toJS()
            }
            btnHiddenList[refs].map(ele => {
                if (ele == btnStatus[pageId] || (ele == btnStatus.find(a => Object.keys(a) == pageId)[pageId])) {
                    btnVisible = true
                }
                else if (btnStatus[pageId] === 0) {
                    btnVisible = true
                }
            })
            return btnVisible
        }
    }

    this.initColumnResize = (injectFuns, gridPath, meta) => {
        if (window.localStorage) {
            let appPath = injectFuns.getPath()
            if (appPath) appPath = appPath.replace(/\//g, '-')
            let htCols = JSON.parse(localStorage.getItem(appPath))

            if (htCols && htCols.cols) {
                htCols.cols.map((ele, i) => {
                    if(htCols.width[i] && ele){
                        da.setMetaProperty(meta, gridPath + '.' + ele + '.flexGrow', 0)
                        da.setMetaProperty(meta, gridPath + '.' + ele + '.width', htCols.width[i])
                    }
                    
                })
            }

            return meta
        }
    }

    this.setColumnResize = (option) => {
        return injectFuns => {
            injectFuns.reduce('setColumnResize', option)
        }
    }
}

Object.assign(exports, { ...authActionCreator, ...exports })