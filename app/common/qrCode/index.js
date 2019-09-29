import React,{ Component,PropTypes } from 'react'
import ReactDOM from 'react-dom'
import './qrCode.less'
import {HCFLayout,Button,MobileCaptcha, Icon,Input} from 'xComponent'
import DynamicComponent from 'dynamicComponent'
// import qrCode from 'qrcode-npm/qrcode'
import qrcode from './qrcode'


export default class ShareByMail extends Component {
	static defaultProps = {
      	prefixCls: 'qrCode'
	}

    constructor(props){
        super(props)
    }

	componentDidMount() {
  		// this.props.initView(this.props.initData)
        // document.querySelector('#qrCode')&&
        //   (document.querySelector('#qrCode').innerHTML = this.getQrCode())
        this.getQrCode()
	}

    shouldComponentUpdate(nextProps){
        return !this.props.payload  || this.props.payload !== nextProps.payload
    }
    getQrCode(){
        var qr2 = new qrcode(document.getElementById('qrCode'),{
            width: 180,
            height: 180,
            correctLevel: 3
        })
        var shareUrl = this.props.initData.url,
            appInfo = this.props.initData.appInfo,
            index = shareUrl.indexOf('?')
        if(index != -1){
            shareUrl = appInfo ? `${shareUrl}&appId=${appInfo.id}` : shareUrl
        }else{
            shareUrl = appInfo ? `${shareUrl}?appId=${appInfo.id}` : shareUrl
        }
        qr2.makeCode(shareUrl)

        //qr2.makeCode(this.props.initData.url)

    }
    render() {
        //let appInfo = this.props.initData.appInfo
        let whereFrom = this.props.initData.from
        return (
            <div className={this.props.prefixCls}>
                {whereFrom=='tax'
                    ?<div>
                        <div className="weixin_popup_foot">请使用微信扫描下方二维码</div>
                        <div className="weixin_popup_foot">分享给企业内部员工</div>
                    </div>
                    :''
                }
                <div id="qrCode">
                    {/*{appInfo ? <img src={appInfo.logoUrlShare} id='erCode'/>:<div id='codeico'></div>}*/}
                    {/*appInfo ? <img src='static/testImg/wxERCode.png' id='erCode'/>:<div id='codeico'></div>*/}

                </div>
                {whereFrom == 'tax' 
                    ? <div className="linkBtn">
                        <a href={this.props.initData.url} target='_blank'>{this.props.initData.url}</a>
                    </div>
                    : ''
                }
                {whereFrom=='tax'
                    ?''
                    :<div>
                        <div className="weixin_popup_foot">请使用微信或QQ“扫一扫”</div>
                        <div className="weixin_popup_foot">将网页分享给好友</div>
                    </div>}
            </div>
	    )
	}
}
