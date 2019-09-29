import React from 'react';
import {Table, Icon, Button} from 'antd';
import {connect} from 'react-redux';
import {addOneUser} from './action';
import {ChildContent01} from '../ChildComponent/ChildContent01'

class Content01 extends React.Component {
    constructor(props) {
        super(props);
        //State主要用于更新界面，组件的State属性在生命周期函数 getInitialState中初始化，
        //  当调用组件的this.setState改变state的时候，组件会重新渲染刷新。
        //Props主要用于组件之间传递数据，也就是标签的属性 this.props.属性  这种方法获取
        this.state = {
            arr:["暴富","暴瘦"]
        }
    }
    //如果babel设置为es6的转码方式，会报错，因为定义静态属性不属于es6，
    //而在es7的草案中。ES6的class中只有静态方法，没有静态属性。
   
    render() {
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: '电话号码',
            dataIndex: 'phone',
            key: 'phone',
        }, {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        }];

        const data = [];
        for (let i = 1; i < 20; i++) {
            let obj = {
                name: '<a href="http://baidu.com>"doudou</a>',
                age: 32,
                number: 123456789,
                email: '123456789@163.com',
            };
            obj.key = i;
            data.push(obj);
        }
        const {num} = this.props

        return (
            <div>
                <button type="button">{num}</button>
                <Table columns={columns} dataSource={data}/>
                {/* <ChildContent01 arr={this.state.arr}></ChildContent01> */}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.get('user').get('data'),
    }
};

const mapActionCreators = {
    addOneUser
};

export default connect(mapStateToProps, mapActionCreators)(Content01);