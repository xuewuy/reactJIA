import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import authActionCreator from './action'
import authReducerCreator from './reducer'

const decorator = option => WrappedComponent => {
	class AuthDecorator extends Component {

		componentDidMount() {
			
		}
		shouldComponentUpdate(nextProps) {
			for (var o in this.props) {
				if (this.props[o] != nextProps[o]) {
					return true
				}
			}
			return false
		}
		// componentWillUnmount() {
		// 	this.props.removeEventListener('onTabFocus')
		// }

		// onTabFocus() {
		// 	this.props.refresh()//由于后台接口问题暂时不支持页签切换回来刷新
		// }
		render() {
			if (!WrappedComponent)
				return null
			if (!this.props.payload || !this.props.payload.get('utils'))
				return null
			//if(this.props._isCurrentTab === false) return null
			
			let getterByField = this.props.payload.getIn(['utils','getterByField']),
				getter = this.props.payload.getIn(['utils','getter'])
			return (
				<WrappedComponent
					ref='wappedComponent'
					{...this.props}
					_getter={getter}
					_getterByField={getterByField} 
				/>
			)
		}

	}

	return AuthDecorator
}

decorator.actionCreator = () => {
	return new authActionCreator()
}

decorator.reducerCreator = () => {
	return new authReducerCreator()
}

export default decorator