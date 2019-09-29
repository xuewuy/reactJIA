import React from 'react';
import {Icon, Avatar} from "antd";

import '../../style/header.scss'

class Header extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const {
            collapsed,
            toggle
        } = this.props
        return (
            <div className="layout-header">
                <Icon
                    className="trigger"
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={toggle}
                />
                {/* <Avatar className="avatar"
                        src={avatar_img}/> */}
            </div>
        )
    }
}
export default Header