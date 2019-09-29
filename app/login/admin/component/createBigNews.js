import React,{ Component,PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import {Button,ZIcon,Upload} from 'xComponent'

const uploadButton = (
                <div className='uploadImg'>
                    <ZIcon
                        icon='upload'
                        colorStyle='lightgray'
                        />
                    <div className="ant-upload-text">上传封面</div>
                </div>
            )

export default class CreateBigNewsComponent extends Component {
    

    handleImportPicture(info){
        let {setMessage,clearMessage} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField'])

        if(info.file.status != 'uploading')
            this.props.hideLoadingMask()
        if (info.file.status === 'uploading') {
        }

        if (info.file.status === 'done') {
            try
            {
                //code不等于80190
                if(!!info.file.response.error){
                    let errorCode = info.file.response.error.code
                    if(errorCode =='50000') {
                        if(info.file.response.error.message==null) {
                            info.file.response.error.message = '服务器内部错误'
                        }
                        setMessage({
                            type:'error',
                            mode:'message',
                            content:info.file.response.error.message
                        })
                        return
                    }
                    setMessage({
                        type:'warning',
                        mode:'message',
                        content:info.file.response.error.message
                    })
                    return
                }
                // 上传成功根据返回值，更新列表
                this.props.importReturnPicture(info.file.response.value, 'isBigNews')
            }
            catch(e){
                throw e
            }
        }
        else if (info.file.status === 'error') {
            return setMessage({
                type:'error',
                mode:'message',
                content:`${info.file.name} 上传失败`
            })
        }
    }

    handleBeforeUpload(info) {
        return new Promise((resolve, reject) => {
            this.props.showLoadingMask({content:'正在上传...'})
            resolve()
            return
        })
    }
    
    render(){
        let {prefixCls, ...otherProps} = this.props
        let utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            path_ = 'admin.createBigNews',
            actionUrl = '/v1/headline/upload',
            imageUrl = getterByField('createBigNews.enclosureAddress') ? '/v1/img/' + getterByField('createBigNews.enclosureAddress') : undefined
        
        return (
            <div className={`${prefixCls}-createBigNews`}>
                <div className={`${prefixCls}-createBigNews-top`}>
                    <span>文章列表</span>
                    {/*<Button type="primary" onClick={::this.handleHomeInfoAdd(homeInfoList)}>选择微信公众号图文素材</Button>*/}
                </div>
                <div className={`${prefixCls}-createBigNewsBody`}>
                    <div className={`${prefixCls}-createBigNewsBody-left`}>
                        <Upload
                            action={actionUrl}
                            headers={{token: getAccessToken()}}
                            listType="picture-card"
                            multiple={false}
                            onChange={::this.handleImportPicture}
                            beforeUpload={::this.handleBeforeUpload}
                            {...{showUploadList:false}}
                            >
                            
                            {imageUrl ? <img src={imageUrl} alt="" className='uploadPic'/> : uploadButton}
                        </Upload>
                    </div>
                    
                    <div className={`${prefixCls}-createBigNewsBody-right`}>
                        <DynamicComponent className={`${prefixCls}-createBigNews-form`} _path={path_} {...otherProps} />

                    </div>
                </div>          
            </div>
        )
    }
}