import React, { Component } from 'react'
import { Modal } from 'antd'
import {
    ZIcon,
    Popover
} from 'xComponent'
class ModalComponent extends Component {

    static = {

    }

    constructor(props) {
        super(props)
        this.state = this.calculateState(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.calculateState(nextProps))
    }

    calculateState(props) {

    }

    componentDidMount() {

    }

    renderHelpTips(title, content, type) {
        if(type && type == 'busPolicyTips') {
            return (
                <div dangerouslySetInnerHTML={{ __html: content.content }} style={{ width: '250px', overflowX: 'hidden', overflowY: 'auto', wordWrap: 'break-word', padding: '5px 2px' }}></div> 
            )
        }
        if (title && title.indexOf('－') > -1) {
            title = title.split('－')[1]
        }
        return (
            <div style={{ width: '250px', padding: '5px 2px' }}>
                <div style={{ fontWeight: 'bold', paddingBottom: '4px' }}>{title}：</div>
                <div><hr /></div>
                <div dangerouslySetInnerHTML={{ __html: content }} style={{ width: '100%', overflowX: 'hidden', overflowY: 'auto', wordWrap: 'break-word', paddingTop: '4px' }}></div>
            </div>
        )
    }

    render() {
        let { title, helpTips, helpTipsContent, ...otherProps } = this.props
        let modalTitle = title
        if (helpTips && helpTipsContent) {
            //标题支持tips提示
            modalTitle = [<span style={{ display: 'inline-block', lineHeight: '21px' }}>{modalTitle}
                <Popover ref='helpPopOver' zIndex='991' content={::this.renderHelpTips(modalTitle,helpTipsContent)} placement={'right'}><ZIcon icon='help' className={'modal-help-title'}></ZIcon></Popover></span>]
        }
        if(otherProps.busPolicyTips) {
            modalTitle = [<span style={{ display: 'inline-block', lineHeight: '21px' }}>{modalTitle}
                <Popover ref='helpPopOver' zIndex='991' content={::this.renderHelpTips(undefined, otherProps.busPolicyTips, 'busPolicyTips')} placement={'right'}><span style={{display: 'inline-block', position: 'relative', fontWeight: 400, cursor: 'pointer', color: '#FFA300'}}>{otherProps.busPolicyTips.title}{/* <ZIcon icon='newInfo' className={'help-busPolicy-tip'}></ZIcon> */}</span></Popover></span>]
        }
        return (
            <div>
                <Modal title={modalTitle} {...otherProps}>
                </Modal>
            </div>
        )
    }
}

ModalComponent.confirm = Modal.confirm
ModalComponent.error = Modal.error
ModalComponent.success = Modal.success
ModalComponent.warning = Modal.warning
ModalComponent.info = Modal.info
export default ModalComponent
