import React from 'react';
import Home from './home/Home';
import Login from './login/Login';
import {Route} from 'react-router-dom';
import '../style/app.scss'
import '../style/body.scss'

class App extends React.Component {
    componentDidMount() {
        const {
            location,
            history
        } = this.props;
        // if (location.pathname === '/home' || location.pathname === '/') {
        //     history.replace('/home')
        // } else if (location.pathname === '/login') {
        //     history.replace('/login')
        // }
    }

    render() {
        return (
            <div className="app">
                <Route path="/home" component={Home}/>
                {/* <Route path="/login" component={Login}/> */}
            </div>
        )
    }
}

export default App;