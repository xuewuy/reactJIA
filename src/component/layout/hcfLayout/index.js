import React,{ Component,PropTypes } from 'react'
import {Header,Footer,Consult} from 'xComponent'
import styles from "./hcfLayout.less"
import {Modal} from 'dynamicComponent'

export default class HCFLayoutComponent extends Component {
	static defaultProps = {
      	prefixCls: 'hcfLayout'
  	}

  	constructor(props){
  		super(props)
	}

  	render() {
  		if(!this.props.payload || !this.props.payload.get('utils') ) 
           return null

       	let message = this.props.payload.getIn(['global', 'message']),
       		{prefixCls, main, ...otherProps} = this.props
	    return (
	    	<div className={this.props.prefixCls} {...this.props}>
	 			<Header {...otherProps} />
	        	<main style={{overflow:'auto'}}>
	        		<div className={`${prefixCls}-left`} />
	           		{main}
	           		<div className={`${prefixCls}-right`} />
					<Consult {...otherProps}/>
	        	</main>
	        	<Footer {...otherProps} />
	        	{Modal(message)}
	     	</div>
	    )
	 }
}
