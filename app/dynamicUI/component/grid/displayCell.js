import React from 'react'
import {Map,List} from 'immutable'
import {Tooltip} from 'xComponent'
import {Table, Column, Cell} from 'fixed-data-table'
import classNames from 'classnames'




export default function DisplayCellComponent(props){
	let { _path, _getter, style, className } = props,
		values = _getter(_path, [ 'value', 'displayMember', 'validate.result', 'type', 'showTips', 'precision',
			'enableEllipsis', 'flexGrow', 'textAlign', 'className', 'preSpaceTransToNbsp','format']),
		value = props._value || values.get('value'),
		displayMember = values.get('displayMember'),
		validateResult = values.get('validate.result'),
		type = values.get('type'),
		showTips = values.get('showTips'),
		precision = values.get('precision'),
		enableEllipsis = values.get('enableEllipsis') == undefined ? false : values.get('enableEllipsis'),
		flexGrow = values.get('flexGrow'),
		textAlign = values.get('textAlign'),
		classNameMeta = values.get('className'),
  		preSpaceTransToNbsp = values.get('preSpaceTransToNbsp') || false,
  		format = values.get('format')


  		let formatFun = (value)=>{
			if(!format)
				return value

			if(format == 'thousand')
				return formatByThousand(value)

			return value
		}


		let formatByThousand = (num) => {
		  	if (isNaN(num)) {
		    	return num
		  	}

		  	return ("" + num).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,");
		}



  		let renderNbsp = ()=>{
			return (<span>&nbsp;&nbsp;&nbsp;</span>)
  		}

	 	let renderError = ()=>{
	        //let validateResult = this.get('validateResult')

	        if(validateResult && validateResult.size > 0){
	            let message = validateResult.toArray().join("")
	            return(
	                <Tooltip title={message}>
	                	<span className=' has-error has-feedback z-grid-displaycell-error' ></span>
	                </Tooltip>
	            )
	        }
	        else{
	            return(<div></div>)
	        }
    	}

    	let handleClick = ( e)=>{
			e.preventDefault()
	      	props.onFieldFocus(_path)
  		}

		switch(type){
			case 'bool':
				value = (value == undefined || value==false)? '否':'是'
				break
			case 'float':
				if(precision && ( !!value )){
					value = parseFloat(value).toFixed(precision)
				}
				break
		}

		if(value == null || value == undefined){
			value = ''
		}

		else if(typeof value === 'object' && displayMember){
			value = displayMember
			if(value == null || value == undefined){
				value = ''
			}
		}

		let text = value + ''
		let ext = {}
		if (showTips) {
			ext.title = value
		}

		ext.style = style

		if(enableEllipsis){
				if (flexGrow != 1) {
						ext.style = { ...ext.style, whiteSpace:'nowrap',overflow:'hidden', textOverflow:'ellipsis'}
				}else{
						ext.style = {whiteSpace:'nowrap',overflow:'hidden', textOverflow:'ellipsis'}
				}
				ext.title = text
		}
		if (textAlign) {
				if (flexGrow != 1) {
						ext.style = { ...ext.style, textAlign: textAlign}
				}else{
						ext.style = {textAlign: textAlign}
				}
		}

		className = classNames({
			'z-grid-displaycell': true,
			[classNameMeta]: !!classNameMeta,
		})

	    let spaceArr = new Array()
	    if(preSpaceTransToNbsp){
	        for(let i=0;i<text.length;i++){
	            if(text.charAt(i) == ' '){
	                spaceArr[i] = ''
	            }else{
	                break;
	            }
	        }
	    }

		return (
          <div
          	onClick={handleClick}
          	{...ext}
          	className={className}>
              	{
                  	spaceArr.map(o=>renderNbsp())
              	}
	          	{formatFun(text)}
	        	{renderError()}
          </div>
		)
}
/*
export default class DisplayCellComponent extends React.Component {
 	state = {
  		data : Map({
  			path: '',
  			value:'',
  			format:'',
  			displayMember:'',
  			className:'',
  			type:'',
  			enableEllipsis:false,
  			style: {},
  			validateResult:[],
        preSpaceTransToNbsp: false  //是否前置空格转为&nbsp;
  		})
  	}

	constructor(props){
		super(props)
		this.state = this.calculateState(this.props)
	}

	componentWillReceiveProps(nextProps){
    	this.setState(this.calculateState(nextProps))
    }

    shouldComponentUpdate(nextProps, nextState){
    	return !this.state.data.equals(nextState.data)
    }

	calculateState(props){
		let {data} = this.state,
			{ _path, _getter, style, className } = props,
			pValues = _getter(_path, [ 'value', 'displayMember', 'validate.result', 'type', 'showTips', 'precision',
				'enableEllipsis', 'textAlign', 'className', 'preSpaceTransToNbsp','format']),
			value = this.props._value || pValues.get('value'),
			displayMember = pValues.get('displayMember'),
			validateResult = pValues.get('validate.result'),
			type = pValues.get('type'),
			showTips = pValues.get('showTips'),
			precision = pValues.get('precision'),
			enableEllipsis = pValues.get('enableEllipsis') == undefined ? false : pValues.get('enableEllipsis'),
			textAlign = pValues.get('textAlign'),
			classNameMeta = pValues.get('className'),
      		preSpaceTransToNbsp = pValues.get('preSpaceTransToNbsp') || false,
      		format = pValues.get('format')

		data = this.set(null,{path: _path, value, displayMember, className, classNameMeta,
                                       validateResult, style, type, showTips, precision,
                                       enableEllipsis,textAlign, preSpaceTransToNbsp, format})
		return {data}
	}

	format(value){
		if(!this.get('format'))
			return value

		if(this.get('format') == 'thousand')
			return this.formatByThousand(value)

		return value
	}


	formatByThousand(num) {
	  if (isNaN(num)) {
	    return num
	  }

	  return ("" + num).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,");
	}


	get(propertyName) {
	    if (!propertyName || propertyName === '') {
	      return this.state.data
	    }
	    return this.state.data.getIn(propertyName.split('.'))
	}

	set(propertyName, value) {
	    let data = this.state.data
	    if (!propertyName || propertyName === '') {
	      return Map(value)
	    }
	    if(value instanceof List){
	    	return data.setIn(propertyName.split('.'), value)
	    }
	    if(typeof value === 'object'){
	      return data.merge(propertyName.split('.'), value)
	    }
	    else{
	      return data.setIn(propertyName.split('.'), value)
	    }
	}

	handleClick( e){
		e.preventDefault()
      	this.props.onFieldFocus(this.get('path'))
  	}


	render(){
		let value = this.get('value'),
			displayMember = this.get('displayMember')
		switch(this.get('type')){
			case 'bool':
				value = (value == undefined || value==false)? '否':'是'
				break
			case 'float':
				let precision = this.get('precision')
				if(precision && ( !!value )){
					value = parseFloat(value).toFixed(precision)
				}
				break

		}
		/*
		if(this.get('type') === 'bool'){
			value = (value == undefined || value==false)? '否':'是'
		}



		if(value == null || value == undefined){
			value = ''
		}
		else if(typeof value === 'object' && displayMember){
			value = value.get(displayMember)
			if(value == null || value == undefined){
				value = ''
			}
		}

		let text = value + ''
		let ext = {}
		if (this.get('showTips')) {
			ext.title = value
		}

		ext.style = this.get('style')

		if(this.get('enableEllipsis')){
			ext.style = { whiteSpace:'nowrap',overflow:'hidden', textOverflow:'ellipsis'}
			ext.title = text
		}
		if (this.get('textAlign')) {
			ext.style = { textAlign: this.get('textAlign')}
		}

		let className = classNames({
			'z-grid-displaycell': true,
			[this.get('classNameMeta')]: !!this.get('classNameMeta'),
		})

    let spaceArr = new Array()
    if(this.get('preSpaceTransToNbsp')){
        for(let i=0;i<text.length;i++){
            if(text.charAt(i) == ' '){
                spaceArr[i] = ''
            }else{
                break;
            }
        }
    }

		return (
          <div
          	onClick={::this.handleClick}
          	{...ext}
          	className={className}>
              {
                  spaceArr.map(o=>this.renderNbsp())
              }
	            {this.format(text)}
	        	{::this.renderError()}
          </div>
		)
	}

  renderNbsp(){
    return (<span>&nbsp;&nbsp;&nbsp;</span>)
  }

	 renderError(){
        let validateResult = this.get('validateResult')

        if(validateResult && validateResult.size > 0){
            let message = validateResult.toArray().join("")
            return(
                <Tooltip title={message}>
                	<span className=' has-error has-feedback z-grid-displaycell-error' ></span>
                </Tooltip>
            )
        }
        else{
            return(<div></div>)
        }
    }
}
*/
