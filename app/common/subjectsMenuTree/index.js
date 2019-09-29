import React,{ Component,PropTypes } from 'react'
import ReactDOM from 'react-dom'
import {HCFLayout,Button,MobileCaptcha, Icon,Input} from 'xComponent'
import DynamicComponent from 'dynamicComponent'
import styles from './style.less'


export default class SubjectsMenuTree extends Component {
	static defaultProps = {
      	prefixCls: 'subjectsMenuTree'
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

  render() {
    	let {prefixCls, ...otherProps} = this.props,
          message = this.props.payload.getIn(['global', 'message'])
       	 return (
  	      <div className={prefixCls}>
            <div style={{height:'306px',overflowY:'auto'}}>
              <DynamicComponent className={`${prefixCls}-subjectsMenuTree`} _path='subjectsMenuTree' {...otherProps} />
            </div>
          </div>
	    )
	}
}
