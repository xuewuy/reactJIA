import React,{ Component,PropTypes } from 'react'
import ReactDOM from 'react-dom'
import './qqFriend.less'
import {HCFLayout,Button,MobileCaptcha, Icon,Input} from 'xComponent'
import DynamicComponent from 'dynamicComponent'


export default class ShareByMail extends Component {
	static defaultProps = {
      	prefixCls: 'qqFriend'
	}

  constructor(props){
    super(props)
  }

	componentDidMount() {
  		// this.props.initView(this.props.initData)
	}
  shouldComponentUpdate(nextProps){
      return !this.props.payload  || this.props.payload !== nextProps.payload
  }
  print(){
    this.props.print()
  }
  render() {
       	 return (
  	      <div className={this.props.prefixCls}>
              <iframe frameborder = '0'   id = 'qqFriend' src={this.props.initData.url}></iframe>
          </div>
	    )
	}
}
