import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Map, List, fromJS } from 'immutable'
import { Dropdown } from 'antd'
const DropdownButton = Dropdown.Button
export default class DropdownButtonComponent extends Component {
	state = {
		disabledClick: false
	}

	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)

		this.disabledClick = false
	}

	componentDidMount() {
		//let b = this.props.disabledClick || false
		//this.disabledClick = b
		//this.setState({disabledClick : b})
	}

	componentWillReceiveProps(nextProps) {
		//let b = nextProps.disabledClick || false
		//this.disabledClick = b
		//this.setState({disabledClick : b})
	}

	handleClick(e) {
		if (this.props.clickInterval) {
			if (this.disabledClick == true) {
				return
			}
			this.disabledClick = true
			this.props.onClick && this.props.onClick(e)

			let that = this
			setTimeout(() => {
				this.disabledClick = false
			}, this.props.clickInterval)
		} else {
			this.props.onClick && this.props.onClick(e)
		}
	}
	// getItems(list) {
	// 	if (!list) return {}
	// 	let domList = List()
	// 	list = list.toJS()
	// 	if (list.length > 0) {
	// 		domList.push(<Menu>)
	// 		list.forEach(element => {
	// 				domList = domList.push(<Menu.Item>{history.title}</Menu.Item>)
	// 			})

	// 		domList.push(</Menu>)
	// 		return domList
	// 	}
	// }





	render() {

		let visible = this.props.visible
		if (visible === true || visible === undefined || visible === null) visible = true
		return visible === true ? (

			<DropdownButton ref='internal' {...this.props}
				onClick={::this.handleClick} />
		):null
	}
}
