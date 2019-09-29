import React from 'react'
import DynamicComponent from 'dynamicComponent'
import {Button} from 'xComponent'
import './flowChart.less'

export default class editClient extends React.Component {
    static defaultProps = {
        prefixCls: 'flowChart'
    }

    componentDidMount() {
        this.props.initView()
    }

    shouldComponentUpdate(nextProps) {
        return !this.props.payload || this.props.payload !== nextProps.payload
    }
    handleBtnClick(type){
        return ()=>{
            this.props.btnClick(type)
        }
    }

    render() {
        if (this.props._isCurrentTab === false) return null //加上这句话
        if (!this.props.payload || !this.props.payload.get('utils')) return null
        let {prefixCls, ...otherProps} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            status = getterByField('from.status') || '001',
            imgObj = {
                '001': { src: require('./images/0.png'), styles: { width: '869px', height: '561px' } },//系统管理员
                '005': { src: require('./images/1.png'), styles: { width: '920px', height: '210' } },//老板
                '003': { src: require('./images/2.png'), styles: { width: '1015px', height: '422px' } },//会计
                '002': { src: require('./images/3.png'), styles: { width: '757px', height: '494px' } }//记账员
            },
            currentImage = imgObj[status]
            
        return (
            <div className={prefixCls}>
                <div className={`${prefixCls}-header`}>
                    <div className={`${prefixCls}-header-btns`}>
                        <Button onClick={::this.handleBtnClick('001')} type={status == '001' ? 'primary' : 'ghost'}>系统管理员</Button>
                        <Button onClick={::this.handleBtnClick('005')} type={status == '005' ? 'primary' : 'ghost'}>老板</Button>
                        <Button onClick={::this.handleBtnClick('003')} type={status == '003' ? 'primary' : 'ghost'}>会计</Button>
                        <Button onClick={::this.handleBtnClick('002')} type={status == '002' ? 'primary' : 'ghost'}>记账员</Button>
                    </div>
                    <div className={`${prefixCls}-header-title`}>
                        流程示意图
                    </div>
                </div>
                <div className={`${prefixCls}-content`}>
                    <img src={currentImage.src} style={currentImage.styles}/>
                </div>
            </div>
        )
    }
}
