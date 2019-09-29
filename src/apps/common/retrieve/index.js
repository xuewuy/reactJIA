import React,{ Component,PropTypes } from 'react'
import ReactDOM from 'react-dom'
import {HCFLayout,Button,MobileCaptcha, Icon} from 'xComponent'
import DynamicComponent,{Modal} from 'dynamicComponent'


export default class LoginNewComponent extends Component {
	static defaultProps = {
      	prefixCls: 'retrieve'
	}

  constructor(props){
    super(props)
  }

	componentDidMount() {
  		this.props.initViewByImmutable(this.props.initMeta,this.props.initData)
	}
  
  shouldComponentUpdate(nextProps){
      return !this.props.payload  || this.props.payload !== nextProps.payload
  }

  render() {
    	let {prefixCls, ...otherProps} = this.props,
          message = this.props.payload.getIn(['global', 'message'])
       	 return (
  	      <div className={prefixCls} >
            <DynamicComponent className={`${prefixCls}-form`} _path={this.props.initMeta.get ? this.props.initMeta.get('name') : this.props.initMeta.name} {...otherProps} />
            {Modal(message)}
          </div>
	    )
	}
}
