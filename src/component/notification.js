import React,{ Component,PropTypes } from 'react'
import ReactDOM from 'react-dom'
import {notification} from 'antd'



export default class NotificationComponent extends Component {
	state = {
		disabledClick : false
	}
    

	constructor(props){
		super(props)
        const args = {
            message: 'Notification Title',
            description: 'I will never close automatically. I will be close automatically. I will never close automatically.',
            duration: 0,
        };
        notification.open(args);

	}

	componentDidMount() {

    }

    componentWillReceiveProps(nextProps){

    }

	render(){
        
		return (
			<div ref='internal' {...this.props}>
            </div>
		)
	}
}