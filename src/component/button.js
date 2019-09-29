import React,{ Component,PropTypes } from 'react'
import ReactDOM from 'react-dom'
import {Button} from 'antd'
import classNames from 'classnames'
import ZIcon from './zIcon'


class ButtonComponent extends Component {
	
	state = {
		disabledClick : false
	}

	constructor(props){
		super(props)
        this.handleKeyUp = this.handleKeyUp.bind(this)
        this.handleClick = this.handleClick.bind(this)
	}

	componentDidMount() {
		 let b = this.props.disabledClick || false
    	this.setState({disabledClick : b})
		if(this.props.isDefaultEnterButton){
			let win = window
	        if (win.addEventListener) {
	            win.addEventListener('keyup', this.handleKeyUp, false)
	        } else if (win.attachEvent) {
	            win.attachEvent('onkeyup', this.handleKeyUp)
	        } else {
	            win.onKeyUp = this.handleKeyUp
	        }
    	}

  	}

  	componentWillReceiveProps(nextProps){
  		let b = nextProps.disabledClick || false
    	this.setState({disabledClick : b})
    }

  	componentWillUnmount(){
  		if(this.props.isDefaultEnterButton){
	        let win = window
	        if (win.removeEventListener) {
	            win.removeEventListener('keyup', this.handleKeyUp, false)
	        } else if (win.detachEvent) {
	            win.detachEvent('onkeyup', this.handleKeyUp)
	        } else {
	            win.onKeyUp = undefined
	        }
    	}
    }

    handleKeyUp(e){
    	if(e.type === 'keyup' && (e.key === 'Enter' || e.keyCode == 13) && e.target.tagName!='BUTTON'){
    		let domNode = ReactDOM.findDOMNode(this.refs.internal)
    		domNode && domNode.focus && domNode.focus()
            // 解决在IE11下按回车键失效
            setTimeout(()=>{
                domNode && domNode.click && domNode.click()
            },14)
    	}
    }

    handleClick(e){
    	//let disabledClick = this.props.disabledClick
    	if(this.state.disabledClick == true){
    		return
    	}

    	//if(disabledClick)
    	this.setState({disabledClick:true})

    	this.props.onClick && this.props.onClick(e)

    	let that = this
    	setTimeout(()=>{
    		that.setState({disabledClick:false})
    	}, 2000)
    }


	render(){
		let {zIcon, icon, visible,colorStyle, ...otherProps} = this.props
		
		if(visible ===true || visible ===undefined || visible ===null) visible=true
		return visible===true ?(!zIcon ? (
			<Button ref='internal' {...otherProps} icon={icon}
				onClick={::this.handleClick} 
			/>
		):(
			<Button ref='internal' {...otherProps} 
				className={classNames({'ant-btn-icon-only':true, [this.props.className || '']:true })}
				style={{border:0, padding:0}}>
				<ZIcon icon={zIcon} shape='square' colorStyle={colorStyle} disabled={this.props.disabled}></ZIcon>
			</Button>
		)):null
	}
}

const btn = ButtonComponent
btn.Group = Button.Group

export default btn