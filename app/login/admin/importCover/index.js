/**
 * Create by lmh on 17/7/21.
 */

import React, { Component, PropTypes } from 'react'
import DynamicComponent, { Modal } from 'dynamicComponent'
import { Menu, Dropdown, Button, Radio, Input, Card, Upload } from 'xComponent'
import './importCover.less'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
let alreadyClick = false

export default class ImportCoverComponent extends Component {
    static defaultProps = {
        prefixCls: 'importCover'
    }

    componentDidMount() {
        this.props.initView()
    }

    shouldComponentUpdate(nextProps) {
        return !this.props.payload || this.props.payload !== nextProps.payload
    }
    handleBeforeUploadClick(info) {
        return new Promise((resolve, reject) => {
            let {setMessage,clearMessage} = this.props,
                getterByField = this.props.payload.getIn(['utils', 'getterByField']),
                fileStrArr = info.name.split('.'),
                fileType =fileStrArr[fileStrArr.length-1]
            if(preventClicks()) {
                return false
            }
            if(fileType!='xls') {
                setMessage ({
                    type: 'warning',
                    content: '请选择正确格式文件导入',
                    mode: 'message'
                })
                return false
            }
            this.props.showLoadingMask({content:'正在导入...'})
            
            return resolve()
        })
    }

    handleImportTemplet(info){
        let {setMessage} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField'])
        if (info.file.status === 'done') {
            try
            {
                this.props.hideLoadingMask()
                
                this.props.importReturn(info.file.response)
            }
            catch(e){
                this.props.hideLoadingMask()
                
                throw e
            }
        }
        else if (info.file.status === 'error') {
            this.props.hideLoadingMask()
            
            return setMessage({
                type:'error',
                mode:'message',
                content:`${info.file.name} 上传失败`
            })
        }
    }

    handleBeforeUploadFirstClick(info) {
        return new Promise((resolve, reject) => {
            let {setMessage,clearMessage} = this.props,
                getterByField = this.props.payload.getIn(['utils', 'getterByField']),
                fileStrArr = info.name.split('.'),
                fileType =fileStrArr[fileStrArr.length-1]
            if(preventClicks()) {
                return false
            }
            if(fileType!='xls') {
                setMessage ({
                    type: 'warning',
                    content: '请选择正确格式文件导入',
                    mode: 'message'
                })
                return false
            }
            this.props.showLoadingMask({content:'正在导入...'})
            
            return resolve()
        })
    }

    handleImportTempletFirst(info){
        let {setMessage} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField'])
        if (info.file.status === 'done') {
            try
            {
                this.props.hideLoadingMask()
                
                this.props.importReturnFirst(info.file.response)
            }
            catch(e){
                this.props.hideLoadingMask()
                
                throw e
            }
        }
        else if (info.file.status === 'error') {
            this.props.hideLoadingMask()
            
            return setMessage({
                type:'error',
                mode:'message',
                content:`${info.file.name} 上传失败`
            })
        }
    }

    render() {
        
        if (!this.props.payload || !this.props.payload.get('utils')) {
            return null
        }

        let message = this.props.payload.getIn(['global', 'message']),
            {prefixCls, ...otherProps} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            businessUser = getterByField('businessUser'),
            businessItem = getterByField('businessItem'),
            url = '/v1/journal/excel/importCheck',
            urlFirst = '/v1//accountPeriodBegin/importOldCode'
        if(businessItem) {
            url = url+'?orgId='+businessItem.get('id')+'&userId='+businessUser.get('id')
            urlFirst = urlFirst+'?orgId='+businessItem.get('id')
            //  +'&userId='+businessUser.get('id')
        }

        return (
            <div className={this.props.prefixCls}>
                <div className={`${prefixCls}-sure-item-date`}>
                    <DynamicComponent {...otherProps} _path="importCover"/>
                    <div className="remarkBox">
                        {businessItem?<Upload
                            action={urlFirst}
                            headers={{token: getAccessToken()}}
                            multiple={false}
                            onChange={::this.handleImportTempletFirst}
                            beforeUpload={::this.handleBeforeUploadFirstClick}
                            type="primary"
                            {...{showUploadList:false}}
                            >
                            <Button type="primary">
                                导入科目对照表
                            </Button>
                        </Upload>:<Button type="primary" disabled={true}>
                                导入科目对照表
                        </Button>}
                        {businessItem?<Upload
                            action={url}
                            headers={{token: getAccessToken()}}
                            multiple={false}
                            onChange={::this.handleImportTemplet}
                            beforeUpload={::this.handleBeforeUploadClick}
                            type="primary"
                            {...{showUploadList:false}}
                            >
                            <Button type="primary">
                                导入历史账
                            </Button>
                        </Upload>:<Button type="primary" disabled={true}>
                                导入历史账
                        </Button>}
                    </div>

                </div>
                {Modal(message)}
            </div>
        )
    }
}

function preventClicks() {
    if(alreadyClick) {
        return true
    } else {
        alreadyClick = true
        setTimeout(function(){
            alreadyClick = false
        },3000)
    }
}