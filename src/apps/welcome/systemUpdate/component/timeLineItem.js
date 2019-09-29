/**
 * Created by zhaoshuo on 2017/6/6.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Menu, Icon, Button, Input,Popover,ZIcon } from 'xComponent'

export default class TimeLineItem extends React.Component {
    constructor(props){
        super(props)
    }
    state={
        hover:false,
        isOpen:false
    }
    componentDidMount(){
        let getterByField = this.props.payload.getIn(['utils','getterByField']),
            activeVersionId = getterByField('activeVersionId'),
            isActive = this.props.value.id === activeVersionId ? true : false
        this.setState({isOpen:isActive})
    }
    componentWillReceiveProps(nextProps){
        let getterByField = nextProps.payload.getIn(['utils','getterByField']),
            activeVersionId = getterByField('activeVersionId'),
            isActive = this.props.value.id === activeVersionId ? true : false
        this.setState({isOpen:isActive})
    }

    getContents(){
        let itemList = []
        let getterByField = this.props.payload.getIn(['utils','getterByField']),
            activeVersionId = getterByField('activeVersionId'),
            isActive = this.props.value.id === activeVersionId ? true : false
        this.props.value && this.props.value.contents.length > 0 ? this.props.value.contents.map((e,i)=>{
            if(!this.state.isOpen){
                if(i < 4){
                    itemList.push(<p>{e}</p>)
                }
            }else{
                itemList.push(<p>{e}</p>)
            }
            
        }) : itemList = []
        return itemList
    }
    handleMoreClick(){
        let getterByField = this.props.payload.getIn(['utils','getterByField']),
            activeVersionId = getterByField('activeVersionId'),
            isActive = this.props.value.id === activeVersionId ? true : false
        this.props.moreClick(this.props.value.id)
        if(!this.state.isOpen){
            this.setState({isOpen:!this.state.isOpen})
        }
    }
    handleExpandContractionClick(){
        this.setState({isOpen:!this.state.isOpen})
    }

    render(){
        let getterByField = this.props.payload.getIn(['utils','getterByField']),
            updateDate = this.props.value.updateDate.split('-'),
            activeVersionId = getterByField('activeVersionId'),
            isActive = this.props.value.id === activeVersionId ? true : false,
            contentActive = isActive || this.state.hover ? {border:`1px solid ${this.props.color}`,boxShadow:`0 0 3px 0 ${this.props.color}`} : {},
            titleActive = isActive || this.state.hover ? {color:this.props.color} : {}
        return (
            <div className={`${this.props.prefixCls}-timeLineItem`} onClick={::this.handleMoreClick}>
                <div style={titleActive} className={this.props.position ? `${this.props.prefixCls}-timeLineItem-title`: `${this.props.prefixCls}-timeLineItem-title title-left`}>
                    <div><strong>{updateDate[1]}</strong>月<strong>{updateDate[2]}</strong>日</div>
                    <div>版本：{this.props.value.versionNum}</div>
                </div>
                <div style={contentActive} onMouseOver={()=>{this.setState({hover:true})}} onMouseOut={()=>{this.setState({hover:false})}} className={this.props.position ? `${this.props.prefixCls}-timeLineItem-content content-left` : `${this.props.prefixCls}-timeLineItem-content`}>
                    {this.getContents()}
                    {this.props.value && this.props.value.contents.length > 4 ? <div className={`${this.props.prefixCls}-more`} >
                        <div onClick={::this.handleExpandContractionClick}>
                            <ZIcon icon={!this.state.isOpen ? 'move-down' : 'move-up'} colorStyle={`${this.props.prefixCls}-more-icon`} />
                            {this.state.isOpen ? '收回' : '更多'}
                        </div>
                    </div> : null}
                </div>
            </div>
        )
    }
}
