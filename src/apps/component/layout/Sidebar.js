import React from 'react';
import {Menu, Icon} from 'antd';
import {Link} from 'react-router-dom';

import '../../style/sidebar.scss'

export default class Sidebar extends React.Component {
    render() {
        const {
            res,
            num
        } = this.props;
        return (
            <div className="layout-sidebar">
                <div className="logo"/>
                <Menu theme="dark"
                      mode="inline"
                      defaultSelectedKeys={[res]}
                >
                    <Menu.Item key="content01">
                        <Link num={num} to={{
                                pathname:`/home/content01/${num}`, 
                                hash:'#ahash',  
                                query:{foo: 'foo', boo:'boo'},  
                                state:{data:'hello'} 
                            }}>
                            <Icon type="user"/>
                            <span>nav 1</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="content02">
                        <Link num={num} to={{
                                pathname:`/home/content02/${num}`, 
                                hash:'#ahash',  
                                query:{foo: 'foo', boo:'boo'},  
                                state:{data:'hello'}   
                            }}>
                            <Icon type="video-camera"/>
                            <span>nav 2</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="content03">
                        <Link to="/home/content03">
                            <Icon type="upload"/>
                            <span>nav 3</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}