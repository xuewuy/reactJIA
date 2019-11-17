import React, {Component} from 'react'
import classNames from 'classnames'

import './style.less'

function generator(props) {
	return (ps)=>{ 
		return Basic({...ps,prefixCls:props.prefixCls})
	}
}

function Basic(props){
	 const { prefixCls, className, children, style, width, 
	    	height, direction, justifyContent, alignItems, ...others } = props

	    let hasSider

	    React.Children.forEach(children, element => {
	      	if (element && element.type && element.type.__X_LAYOUT_SIDER) {
	        	hasSider = true
	      	}
	    })

	    const divCls = classNames(prefixCls, {
	      	[`${prefixCls}-has-sider`]: hasSider,
	    },className)

	    const divStyle = {...style}

	    if(width){
	    	divStyle.flex = `0 0 ${width}px`
	    	divStyle.width = `${width}px`
	    }

	    if(height){
	    	divStyle.flex = `0 0 ${height}px`
	    	divStyle.height = `${height}px`
	    }

	    if(direction){
	    	divStyle.flexDirection = direction
	    }

	    divStyle.justifyContent = justifyContent 

	    if(alignItems){
	    	divStyle.alignItems = alignItems
	    }

	    return (
	      	<div className={divCls} {...others} style={divStyle}>{children}</div>
	    )
}


const Layout = generator({
  	prefixCls: 'x-layout',
})

const Header = generator({
  prefixCls: 'x-layout-header',
})

const Footer = generator({
  prefixCls: 'x-layout-footer',
})

const Content = generator({
  prefixCls: 'x-layout-content',
})

Layout.Header = Header
Layout.Footer = Footer
Layout.Content = Content


export default Layout