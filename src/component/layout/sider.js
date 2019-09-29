
import React, {Component} from 'react'
import classNames from 'classnames'
import omit from 'omit.js'
import {Icon} from 'antd'


export default class Sider extends Component {
    static __X_LAYOUT_SIDER = true;

    static defaultProps = {
      prefixCls: 'x-layout-sider',
      collapsible: false,
      defaultCollapsed: false,
      reverseArrow: false,
      width: 200,
      collapsedWidth: 64,
      style: {},
    }

    constructor(props) {
        super(props)
       
        let collapsed
        if ('collapsed' in props) {
            collapsed = props.collapsed
        } else {
            collapsed = props.defaultCollapsed
        }
        this.state = {
            collapsed,
            below: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('collapsed' in nextProps) {
            this.setState({
                collapsed: nextProps.collapsed,
            })
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    setCollapsed = (collapsed, type) => {
        if (!('collapsed' in this.props)) {
            this.setState({
                collapsed,
            })
        }
        
        const { onCollapse } = this.props
        
        if (onCollapse) {
            onCollapse(collapsed, type)
        }
    }

    toggle = () => {
        const collapsed = !this.state.collapsed
        this.setCollapsed(collapsed, 'clickTrigger')
    }

    render() {
        const { prefixCls, className,
            collapsible, reverseArrow, trigger, style, width, collapsedWidth,
            ...others,
        } = this.props
      debugger
        const divProps = omit(others, ['collapsed',
            'defaultCollapsed', 'onCollapse', 'breakpoint'])

        const siderWidth = this.state.collapsed ? collapsedWidth : width

        // special trigger when collapsedWidth == 0
        const zeroWidthTrigger = collapsedWidth === 0 || collapsedWidth === '0' ? (
            <span onClick={this.toggle} className={`${prefixCls}-zero-width-trigger`}>
                <Icon type="bars" />
            </span>
        ) : null


        const iconObj = {
            'expanded': reverseArrow ? <Icon type="right" /> : <Icon type="left" />,
            'collapsed': reverseArrow ? <Icon type="left" /> : <Icon type="right" />,
        }

        const status = this.state.collapsed ? 'collapsed' : 'expanded'
        const defaultTrigger = iconObj[status]
        const triggerDom = ( trigger !== null 
            ? zeroWidthTrigger || (
                <div className={`${prefixCls}-trigger`} onClick={this.toggle}>
                    {trigger || defaultTrigger}
                </div>
            ) : null)

        const divStyle = {
            ...style,
            flex: `0 0 ${siderWidth}px`,
            width: `${siderWidth}px`,
        }

        const siderCls = classNames(className, prefixCls, {
          [`${prefixCls}-collapsed`]: !!this.state.collapsed,
          [`${prefixCls}-has-trigger`]: !!trigger,
          [`${prefixCls}-below`]: !!this.state.below,
          [`${prefixCls}-zero-width`]: siderWidth === 0 || siderWidth === '0',
        })
    
        return (
          <div className={siderCls} {...divProps} style={divStyle}>
            {this.props.children}
            {collapsible || (this.state.below && zeroWidthTrigger) ? triggerDom : null}
          </div>
        )
  }
}