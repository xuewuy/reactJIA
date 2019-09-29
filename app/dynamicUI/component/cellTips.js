import React from 'react'
import { Map, fromJS, List } from 'immutable'
import classNames from 'classnames'
import {Popover} from 'xComponent'
import { Button, ZIcon } from 'xComponent'

export default class CellTips extends React.Component {
    static defaultProps = {
      prefixCls: 'cellTips'
    }

    state = {
        data: Map({
            value: null,
            className:''
        })
    }

    constructor(props) {
        super(props)
        this.state = this.calculateState(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.calculateState(nextProps))
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !this.state.data.equals(nextState.data)
    }

    calculateState(props) {
        let {data} = this.state,
            {_getter, _getterByField, _path, _value} = props,
            pValues = _getter(_path, ['value', 'iconType', 'className', 'showTipsPop', 'showContentPop','popoverClass','placement']) ,
            value = pValues.get('value') == undefined ? (pValues.get('value') || _value) : pValues.get('value'),
            iconType = pValues.get('iconType') || 'message-info',
            className = pValues.get('className') || '',
            showTipsPop = pValues.get('showTipsPop') || false,
            showContentPop = pValues.get('showContentPop') || false,
            popoverClass = pValues.get('popoverClass') || false,
            placement = pValues.get('placement') || false

        data = data.set('value', value)
        data = data.set('className', className)
        data = data.set('iconType', iconType)
        data = data.set('showTipsPop', showTipsPop)
        data = data.set('showContentPop', showContentPop)
        data = data.set('popoverClass', popoverClass)
        data = data.set('placement',placement)

        return {data}
    }

    get(propertyName) {
        if (!propertyName || propertyName === '') {
            return this.state.data
        }
        return this.state.data.getIn(propertyName.split('.'))
    }

    set(propertyName, value) {
        let data = this.state.data
        return data.setIn(propertyName.split('.'), value)
    }

    render() {
  		let className = classNames({
      			 [this.props.prefixCls]: true,
      			 [this.get('className')]: !!this.get('className'),
      		}),
          { prefixCls } = this.props,
          tipContent, contentPop,
          message = this.get('value').get('message'),
          tips = this.get('value').get('message'),
          getContent = this.getContent(),
          iconType = this.get('iconType'),
          icType = this.get('value').get('icType'),
          disabled = this.get('value').get('disabled')?true:false,
          color = this.get('value').get('color'),
          showTipsPop = this.get('showTipsPop'),
          showContentPop = this.get('showContentPop'),
          popoverClass = this.get('popoverClass'),
          placement = this.get('placement'),
          getContentPop = this.getContentPop()

          if(icType) {
            iconType = icType
          }

      if(tips && showTipsPop) {
        tipContent = <Popover overlayClassName={'tipContent'} content={getContent}><a disabled={disabled} style={{paddingTop: '4px', position: 'absolute'}}><ZIcon icon={iconType} style={{color: color}} title='' /></a></Popover>
      }

      if(showContentPop && message && popoverClass===undefined) {
          contentPop = <Popover overlayClassName={'contentPop'} content={getContentPop}><a disabled={disabled}>{this.get('value').get('content')}</a></Popover>
      }else if(showContentPop && message && popoverClass && placement){
          contentPop = <Popover overlayClassName={'contentPop '+popoverClass} placement={placement} content={getContentPop}><a disabled={disabled}>{this.get('value').get('content')}</a></Popover>          
      }else {
          contentPop = this.get('value').get('content')
      }
      console.log(contentPop)

      return (
          <div className={className} style={{ color: color, height: '100%', width: '100%', position: 'relative', textAlign: 'center', lineHeight: '32px'}}>
              {contentPop}{tipContent}
          </div>
      )
    }

    getContent() {
        return (
            <div style={{width: '200px', textAlign: 'center'}}>
                {this.get('value').get('message')}
            </div>
        )
    }

    getContentPop() {
        let message = this.get('value').get('message')

        return  (message && message.size) ? <div style={{display: 'inline-table'}}>
                    {
                        message.map(item => <div>
                            {item.get('title')}
                            {item.get('content').map(element => <div>{element}<br /></div>)}
                        </div>)
                    }
                </div> : <div></div>

        }
}
