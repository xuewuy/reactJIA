import React, {Component} from 'react'
import tabDecorator from '../tabDecorator'
import metaDecorator from '../metaDecorator'
import * as action from './action'
import * as reducer from './reducer'
import DynamicComponent from 'dynamicComponent'

const decorator = option => WrappedComponent =>{
	@metaDecorator()
	@tabDecorator()
	class ListDecorator extends Component{

		render(){
			if(!WrappedComponent) 
				return null

			if(option){
				// const MovablePanelComp=option.registerComponent
				// let style={
				// 	bottom: 80,
				// 	right: 40,
				// 	width:70,
				// 	height:70,
				// }
				// return(
				// 	<MovablePanelComp style={style} { ...this.props} _path='root'/>
				// )
			}

			return(
				<DynamicComponent  {...this.props} _path='root'/>
			)
		}

	}

	return ListDecorator
}

decorator.action = action
decorator.reducer = reducer

export default decorator