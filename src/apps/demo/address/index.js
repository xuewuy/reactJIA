import React from 'react'
import DynamicComponent from 'dynamicComponent'
import {HCFLayout, Button, Steps, CountDownButton,Alert,Address} from 'xComponent'

export default class CardDemoComponent extends React.Component {
    componentDidMount() {
        this.props.initView()
    }
    bthClick(){
        this.props.btnchange()
    }

    render() {
        return (
            <div className='listTemplate' style={{padding:'100px'}}>
        	   <DynamicComponent {...this.props} _path="listDemo"/>
               <Button onClick={::this.bthClick}>获取更改后的数据</Button>
            </div>
        )
    }
}

