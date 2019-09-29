import React,{ Component,PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import {HCFLayout,Button, Tabs, Radio, Table, Column, Cell, Card,Modal,Pagination} from 'xComponent'

export default class dzInfoComponent extends Component {
    componentDidMount() {
        $('iframe').attr('frameborder','0')
    }
    render(){
        let {prefixCls, ...otherProps} = this.props,
            src = location.protocol +'//'+ location.hostname+':'+location.port+'/share/acm_engine/index.html'
            // height = height > 402 ? 402 : height

        return (
            <div className={`${prefixCls}-operationPlatform ${prefixCls}-organizationalInfo`} style = {{width:'100%'}}>
                <iframe style = {{width:'100%',height:'100%'}} src = {src} id = 'acm-engine-warp'></iframe>
            </div>
        )
    }
}
