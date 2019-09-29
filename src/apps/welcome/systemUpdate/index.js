import React from 'react'
import { Row, Col, Card ,ReactEcharts ,Button, MovablePanel,Popover,ZIcon, Input} from 'xComponent'
import DynamicComponent,{Modal} from 'dynamicComponent'
import { Timeline } from 'antd'
import ReactDOM from 'react-dom'
import './systemUpdate.less'
import TimeItenYear from './component/timeItemYear'
import TimeLineItem from './component/timeLineItem'


export default class WelcomeComponent extends React.Component {
    static defaultProps = {
        prefixCls: 'systemUpdate'
    }
    componentDidMount() {
        this.props.initView(this.props.versionId)
    }
    constructor(props){
        super(props)
    }

    getTimeIten(data){
        let itemList = [],
            position = true,
            current = {year:'',colorIndex:-1},
            colorArr = ['#89CD89','#b9c1eb','#f6a6a6','#eca7d4','#b5deb3','#f2dfa5','#a7d0f4','#FBC8AD'],
            {prefixCls, ...otherProps} = this.props

        data.map((e,i)=>{
            if(e.updateDate.split('-')[0] != current.year){
                current = {year:e.updateDate.split('-')[0],colorIndex: current.colorIndex+1}
                itemList.push(<Timeline.Item className={`${prefixCls}-year`} dot={<TimeItenYear {...this.props} value={current.year} color={colorArr[current.colorIndex]} />}></Timeline.Item>)
            }
            itemList.push(<Timeline.Item dot={<TimeItenYear {...this.props} color={colorArr[current.colorIndex]} />}><TimeLineItem {...this.props} color={colorArr[current.colorIndex]}  value={e} position={position} /></Timeline.Item>)
            position = !position

        })
        return itemList
    }
    
    render() {
        if(this.props._isCurrentTab === false) return null //加上这句话
        if (!this.props.payload || !this.props.payload.get('utils'))
            return null
        let message = this.props.payload.getIn(['global', 'message']),
            {prefixCls, ...otherProps} = this.props,
            getterByField = this.props.payload.getIn(['utils','getterByField']),
            formData = getterByField('form').toJS()
        return (
            <div className={`${prefixCls}`}>
                <Card>
                    <div className={`${prefixCls}-title`}>产品更新</div>
                    <Timeline>
                        {this.getTimeIten(formData)}
                    </Timeline>
                </Card>
            </div>
        )
    }
}
