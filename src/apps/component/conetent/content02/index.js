import React from 'react';
import { Button } from 'antd';
import {connect} from 'react-redux';
import {addOneUser} from './action';

class Content02 extends React.Component {
    constructor(props) {
        super(props);
    }

    aa(){
      alert(111)
    }

    add(){
        this.setState({
            num:  ++this.props.num
        })
    }
    plus(){
        this.setState({
            num:  --this.props.num
        })
    }

    render() {

        return (
            <div>
                <button type="button">{this.props.num}</button>
                <br />
                <button onClick={this.add.bind(this)} style={{}} type="button">+</button>
                <br />
                <button onClick={this.plus.bind(this)}  type="button">-</button>
                <br />
                <Button type="primary" shape="circle" icon="search" onClick={this.aa.bind(this)} />
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

export default connect(mapStateToProps, mapActionCreators)(Content02);