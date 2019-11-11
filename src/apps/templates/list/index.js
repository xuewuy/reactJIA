import React from 'react'
import './style.less'
import DynamicComponent from 'dynamicComponent'

export default class ListComponent extends React.Component {

    static defaultProps = {
        prefixCls: 'listTemplate'
    }

	constructor(props){
		super(props)
	}
 	
 	componentDidMount() {
        this.props.initViewById(this.props.appParams.sysId, this.props.appParams.mId, this.props.appParams.id)
    }


    shouldComponentUpdate(nextProps, nextState){
        return nextProps.payload !== this.props.payload
    }



    render() {
        return (
            <div className={this.props.prefixCls}>
        	   <DynamicComponent {...this.props} _path={this.props.appParams.mId} />
            </div>
        )
    }
}
