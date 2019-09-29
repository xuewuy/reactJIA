import React from 'react'
import {MovablePanel,ZIcon,Popover,Button} from "xComponent"
import './consult.less'

export default class ConsultComponent extends React.Component {
  static defaultProps = {
    prefixCls: 'consult'
  }

  constructor(props) {
    super(props)
  }

  hendleConsultClick(){
    qimoChatClick()
  }

  render(){
    let prefixCls = this.props.prefixCls,
    getterByField = this.props.payload && this.props.payload.getIn(['utils', 'getterByField']),
    appInfo = getterByField && getterByField('appInfo'),
    appServiceTel = (appInfo && appInfo.get('appServiceTel') || '400-6060-386'),
    qrCodeWx = (appInfo && appInfo.get('qrCodeWx') || '/static/images/default/wxercode.png'),
        weChatContent = (
          <div className={`${prefixCls}-weChatContent`}>
            <img src={qrCodeWx} />
            <p>扫一扫 关注公众号</p>
          </div>
        ),
        phoneContent = (
          <div className={`${prefixCls}-phoneContent`}>
            <p>客服电话</p>
            <p>{appServiceTel}</p>
          </div>
        )
    return (
        <div className={prefixCls}>
          <div className={`${prefixCls}-side1`}  onClick={::this.hendleConsultClick}>
          </div>
          <Popover content={weChatContent} placement="left" overlayClassName={`${prefixCls}-code`}>
            <div className={`${prefixCls}-side2`}></div>
          </Popover>
          <Popover content={phoneContent} placement="left">
            <div className={`${prefixCls}-side3`}></div>
          </Popover>
        </div>
    )
  }
}