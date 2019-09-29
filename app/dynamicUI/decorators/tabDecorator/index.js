import React, {Component} from 'react'
import classNames from 'classnames'
import * as action from './action'
import * as reducer from './reducer'

const decorator = option => WrappedComponent =>{
	class TabDecorator extends Component{

		componentDidMount() {
	        if(this.props.addEventListener){
	            this.props.addEventListener('onTabFocus', this.props.listenTabFocus)
	            this.props.addEventListener('onTabAdd', this.props.listenTabAdd)
	            this.props.addEventListener('onDelTab', ::this.handleTabClose )
	        }
    	}

    	componentWillUnmount() {
    		if(this.props.removeEventListener){
        		this.props.removeEventListener('onTabFocus')
        		this.props.removeEventListener('onTabAdd')
        		this.props.removeEventListener('onTabClose')
        	}
    	}

    	handleTabClose(){
			setTimeout(()=>{
				this.props.listenTabClose(()=>{
    				let url = this.props.tab.get('url')
    				this.props.onDelTab(url, true, false)
    			})
			})    		
    	}

		render(){
			if(!WrappedComponent) 
				return null

			if(this.props._isCurrentTab === false) 
				return null

			return (
				<WrappedComponent 
					{...this.props} 
				/>
			)

			
		}
	}

	return TabDecorator
}


decorator.action = action
decorator.reducer = reducer

export default decorator