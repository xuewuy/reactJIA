import React, { Component, PropTypes } from 'react'
import { Modal, Button, Message, Tooltip } from 'xComponent'
import { AppLoader } from 'appLoader'

Message.config({
    top: 30,
    duration: 2,
});

function getApp(message) {
    let content = message.content
    if (content.indexOf('app:') !== -1) {
        let appPath = content.replace('app:', '')

        return (<AppLoader path={appPath} ref={message.refName} />)
    }
    return null
}


function showModal(message) {
    return (
        <Modal visible {...message} >
            {message.content}
        </Modal>
    )
}

function showApp(message) {
    let content = message.content
    if (content.indexOf('app:') === -1)
        return null

    let handleOk = () => {
        let onOk = message.onOk
        if (message.refName) {

            let appProps = app._owner._instance.refs[message.refName].refs.wrappedInstance.refs.connector.refs.wrappedInstance.props
            if (appProps.onOk) {
                appProps.onOk(data => {
                    if (!data || !data.result) return
                    message.onOk && message.onOk(data)
                })
            }
            else {
                onOk && onOk()
            }
        }
        else {
            onOk && onOk()
        }
    }

    let handleCancel = () => {
        let onCancel = message.onCancel
        if (message.refName) {

            let appProps = app._owner._instance.refs[message.refName].refs.wrappedInstance.refs.connector.refs.wrappedInstance.props
            if (appProps.onCancel) {
                appProps.onCancel(data => {
                    if (data && data.result == false) return
                    message.onCancel && message.onCancel(data)
                })
            }
            else {
                onCancel && onCancel()
            }
        }
        else {
            onCancel && onCancel()
        }
    }
    let handleCustom = (i) => {
        return () => {
            let event = message.custom[i].action
            if (message.refName) {
                let appProps = app._owner._instance.refs[message.refName].refs.wrappedInstance.refs.connector.refs.wrappedInstance.props
                if (appProps[event]) {
                    appProps[event](data => {
                        if (data && data.result == false) return
                        message[event] && message[event](data)
                    })

                } else {
                    message[event] && message[event]()
                }
            } else {
                message[event] && message[event]()
            }
        }
    }


    let appPath = content.replace('app:', ''),
        app = <AppLoader path={appPath} initData={message.initData} ref={message.refName} onMsgOk={message.onOk} />

    let footer = message.footer
    if (!footer && !message.hideFooter) {
        footer = message.onCancel ? [
            <Button key="cancel"
                type="ghost"
                size="large"
                onClick={handleCancel}>
                {message.cancelText || '取消'}
            </Button>,
            <Button key="confirm"
                type="primary"
                size="large"
                disabled={message.disabled}
                onClick={handleOk}>
                {message.okText || '确定'}
            </Button>
        ] : [
                <Button key="confirm"
                    type="primary"
                    size="large"
                    disabled={message.disabled}
                    onClick={handleOk}>
                    {message.okText || '知道了'}
                </Button>
            ]
        if (message.onlyCancel) {
            footer.pop()
            //if(message.initData && message.initData.showBtnReply==true){
            //message.custom=[]
            //}
        }
        if (message.custom) {
            message.custom.map((element, index) => {
                if (element.tooltip) {
                    footer.push(
                        <Tooltip title={element.tooltip}>
                            <Button key={element.action + index}
                                type={element.type}
                                size="large"
                                ref={element.ref}
                                disabled={element.disabled}
                                onClick={handleCustom(index)}>
                                {element.name}
                            </Button>
                        </Tooltip>
                    )
                }
                else {
                if (element.fireEvent=='hover') {
                    footer.push(
                         <Button key={element.action + index}
                            type={element.type}
                            size="large"
                            ref={element.ref}
                            disabled={element.disabled}
                            style={{position:'absolute',right:'10px'}}
                            onMouseOver={handleCustom(index)}>{element.name}
                        </Button>
                    )  
                }
                else{
                    footer.push(
                         <Button key={element.action + index}
                            type={element.type}
                            size="large"
                            ref={element.ref}
                            disabled={element.disabled}
                            onClick={handleCustom(index)}>
                            {element.name}
                        </Button>
                    )  
                }
                    
                }
            })
        }
    }

    if (message.footerLeft) {
        footer.splice(0, 0, message.footerLeft)
    }

    //antd的默认z-index: popover-1030, modal-1000, select的dropdown-1050
    //默认z-index的问题: 在popover里弹出modal,modal会在popover后面(被挡).
    //修改modal的z-index为1040的隐患: 在modal上使用popover会被挡
    //不能修改modal的z-index为太大的值: 会使得modal上的select控件的下拉被遮挡
    //后续如果对其他地方有影响,可以增加参数来动态控制弹出时的z-index(在"新增凭证-辅助核算-下拉选项-新增"处用到popover里弹出modal)
    let zIndex = message.highZIndex ? 1040 : undefined  // zIndex={zIndex}  haolj comment 2016-12-19
    return (
        <Modal maskClosable={false} visible {...message} onCancel={handleCancel} footer={footer}>
            {app}
        </Modal>
    )
}

function showError(message) {
    if (message.mode === 'message') {
        //自定义时长为：message.duration。
        //有些错误信息内容比较多时，需要自定义延时时间来读取弹出的信息。
        if (message.duration && !isNaN(message.duration)) {
            Message.error(message.content, message.duration)
        } else {
            //error类型,默认3s
            Message.error(message.content, 5) //修改为默认5秒
        }
    }
    else {
        Modal.error({
            ...message
        })
    }
}

function showSuccess(message) {
    if (message.mode === 'message') {
        //自定义时长为：message.duration。
        //有些成功信息内容比较多时，需要自定义延时时间来读取弹出的信息。
        if (message.duration && !isNaN(message.duration)) {
            Message.success(message.content, message.duration)
        } else {
            //success类型,默认时长为 2s。
            Message.success(message.content, 2)
        }
    }
    else {
        Modal.success({
            ...message
        })
    }
}

function showWarning(message) {
    if (message.mode === 'message') {
        //自定义时长为：message.duration。
        //有些错误信息内容比较多时，需要自定义延时时间来读取弹出的信息。
        if (message.duration && !isNaN(message.duration)) {
            Message.warning(message.content, message.duration)
        } else {
            //warning类型,默认3s
            Message.warning(message.content, 3)
        }
    }
    else {
        let handleOk = (close) => {
            close()
            message.onOk()
        }

        Modal.warning({
            ...message, onOk: handleOk
        })
    }
}

function showInfo(message) {
    if (message.mode === 'message') {
        Message.info(message.content)
    }
    else {
        Modal.info({
            ...message
        })
    }
}

function showLoading(message) {
    let handleHide = Message.loading(message.content, 0)
    if (message.onHide) {
        message.onHide(handleHide)
    }
    else {
        setTimeout(hide, 2500)
    }
}

export function modal(message) {
    if (!message) return

    let msg = message.toJS(),
        type = msg.type

    if (type === 'app') {
        return showApp(msg)
    } else if (type === 'modal') {
        return showModal(msg)
    } else if (type === 'error') {
        return showError(msg)
    } else if (type === 'confirm') {

        let handleOk = (close) => {
            close()
            msg.onOk()
        }
        Modal.confirm({
            ...msg, onOk: handleOk
        })
        if(msg.clearFocus){
            setTimeout(()=>document.activeElement.blur(),0)
        }
    } else if (type === 'success') {
        return showSuccess(msg)
    } else if (type === 'warning') {
        return showWarning(msg)
    } else if (type === 'loading') {
        return showLoading(msg)
    } else {
        return showInfo(msg)
    }
}
