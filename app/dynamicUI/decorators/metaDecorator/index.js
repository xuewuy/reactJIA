import React, {Component} from 'react'

import * as action from './action'
import * as reducer from './reducer'

const decorator =  option => WrappedComponent =>{
	class MetaDecorator extends Component{

		componentDidMount() {
        	this.props.initView(this, this.props.store)
    	}

    	shouldComponentUpdate(nextProps){
	        for(var o in this.props){
	            if(this.props[o] != nextProps[o]){
	                return true
	            }
	        }
	        return false
    	}

		render(){
			if(!WrappedComponent) 
				return null
			
			if(!this.props.payload || !this.props.payload.get('utils') )  
				return null

			let getterByField = this.props.payload.getIn(['utils','getterByField']),
				getter = this.props.payload.getIn(['utils','getter'])
        	console.log('meta-render')
			return (
				<WrappedComponent 
					{...this.props} 
					_getter={getter}
					_getterByField={getterByField} />
			)
		}
	}

	return MetaDecorator
}

class MetaComponent extends Component{
	componentDidMount() {
    	this.props.initView(this, this.props.store)
	}

	shouldComponentUpdate(nextProps){
        for(var o in this.props){
            if(this.props[o] != nextProps[o]){
            	debugger
                return true
            }
        }

        console.log('no update')

        return false
	}
	render(){
		if(!this.props.children) 
			return null
		
		if(!this.props.payload || !this.props.payload.get('utils') )  
			return null
		console.log('meta-render')

		let getterByField = this.props.payload.getIn(['utils','getterByField']),
			getter = this.props.payload.getIn(['utils','getter'])

    	return this.props.children
    	/*
		return (
			<WrappedComponent 
				{...this.props} 
				_getter={getter}
				_getterByField={getterByField} />
		)*/
	}
}

decorator.action = action
decorator.reducer = reducer

export default decorator