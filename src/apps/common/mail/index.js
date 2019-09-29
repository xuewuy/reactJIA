import React,{ Component,PropTypes } from 'react'
import ReactDOM from 'react-dom'
import './mail.less'
import {HCFLayout,Button,MobileCaptcha, Icon,Input} from 'xComponent'
import DynamicComponent from 'dynamicComponent'


export default class ShareByMail extends Component {
	static defaultProps = {
      	prefixCls: 'mail'
	}

  constructor(props){
    super(props)
  }

	componentDidMount() {
  		this.props.initView(this.props.initData)
	}
 
  shouldComponentUpdate(nextProps){
      return !this.props.payload  || this.props.payload !== nextProps.payload
  }
  print(){
    this.props.initData.print && this.props.initData.print()
  }
  render() {
    	let {prefixCls, ...otherProps} = this.props,
            appInfo = this.props.initData.appInfo,
            index = this.props.initData.url.indexOf('?'),
            shareUrl
      if(index != -1){
          shareUrl = appInfo ? `${this.props.initData.url}&appId=${appInfo.id}` : this.props.initData.url
          /*&name=${appInfo.name}&iconUrl=${appInfo.iconUrl}*/
      }else{
          shareUrl = appInfo ? `${this.props.initData.url}?appId=${appInfo.id}` : this.props.initData.url
      }

       	 return (
  	      <div className={prefixCls}>
            {
              //<Input></Input>
            }
            <div style={{height:'306px',overflowY:'auto'}}>
              <DynamicComponent className={`${prefixCls}-form`} ref='mailForm' _path='mailForm' {...otherProps} />
              <div>
                <span>附 件：</span>
                <a className ={`${prefixCls}-pdf`}
                   href = "javascript:;" 
                   onClick = {::this.print}>{this.props.initData.tableName}.pdf</a>
              </div>
            </div>
            <div className = 'mail-content'>
              <h5>您好！</h5>
              <p className = {`${prefixCls}-mailcontent`}>
                {this.props.initData.mailcontent}
                  {/*<a href = {this.props.initData.url} target='_blank'>{this.props.initData.url}</a>*/}
                  {/*<a href = {appInfo ? `${this.props.initData.url}&appId=${appInfo.appId}&name=${appInfo.name}` : this.props.initData.url} target='_blank'>{this.props.initData.url}</a>*/}
                  <a href = {shareUrl} target='_blank'>{this.props.initData.url}</a>
              </p>
              <h4>Thanks!</h4>
            </div>
          </div>
	    )
	}
}
