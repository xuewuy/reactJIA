import React from 'react'
import './style.less'
import DynamicComponent from 'dynamicComponent'

export default class VoucherComponent extends React.Component {

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
            <div className='voucherTemplate'>
               <DynamicComponent {...this.props} _path={this.props.appParams.mId} />
            </div>
        )
        /*
        return (
        	<DynamicComponent {...this.props} _path={this.props.appParams.mId} />
        )*/
    }
}
