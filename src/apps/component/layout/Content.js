import React from 'react';
import {Route} from 'react-router-dom';
import Content01 from '../conetent/content01/index';
import Content02 from '../conetent/content02/index';
import Content03 from '../conetent/content03/index';

import '../../style/content.scss'

export default class Content extends React.Component {
    constructor(props){
        super(props)

    }
    
    render() {
        let  {match,location,history} =this.props
        const {num} = this.props
        return (
            <div>
                <Route path="/home"/>
                <Route path={`/home/Content01/${num}`} component={Content01}/>
                <Route path={`/home/Content02/${num}`} component={Content02}/>
                <Route path="/home/Content03" component={Content03}/>
            </div>
        )
    }
}