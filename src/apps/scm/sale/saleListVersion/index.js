import React,{Component} from 'react'
import {decorators} from 'dynamicComponent'
import DynamicComponent from 'dynamicComponent'
const TabDecorator = decorators.TabDecorator
const MetaDecorator = decorators.MetaDecorator
import './style.less'

@MetaDecorator()
@TabDecorator()
export default class List extends Component{
	render(){
		return <DynamicComponent  {...this.props} _path='root'/>
	}
}