import React from 'react';
import {matchPath} from 'react-router-dom';
import Header from '../layout/Header';
import Content from '../layout/Content';
import Sidebar from '../layout/Sidebar';
import {Layout} from 'antd';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            num:1
        };
        this.ress = ['content01', 'content02', 'content03'];
        this.res = null;
        const match = matchPath(this.props.history.location.pathname, {
            path: '/home/:res'
        });
        if (match) {
            this.res = match.params.res;
        }

        this.toggle = () => {
            this.setState({
                collapsed: !this.state.collapsed
            })
        };
    }

    componentWillMount() {
        if (!this.res || !this.res.length || this.ress.indexOf(this.res) === -1) {
            this.props.history.replace(`/home`)
        }
    }

    render() {
        return (
            <Layout className="layout-app">
                <Layout.Sider
                    trigger={null}
                    collapsible
                    collapsedWidth = '100'
                    collapsed={this.state.collapsed}
                >
                    <Sidebar num={this.state.num} res= {this.res}/>
                </Layout.Sider>
                <Layout>
                    <Layout.Header style={{background: '#fff', padding: 0}}>
                        <Header collapsed={this.state.collapsed}
                                toggle={this.toggle}
                        />
                    </Layout.Header>
                    <Layout.Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>
                        <Content num={this.state.num}/>
                    </Layout.Content>
                </Layout>
            </Layout>
        )
    }
}