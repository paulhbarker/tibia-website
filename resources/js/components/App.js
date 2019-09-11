import Home from './pages/Home';
import ReactDOM from 'react-dom';
import Login from './pages/Login';
import React, { Component } from 'react';
import AppRoute from './routing/AppRoute';
import Signup from './pages/Signup/Signup';
import Verification from './pages/Verification';
import Dashboard from './pages/Dashboard/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import { BrowserRouter, Switch } from 'react-router-dom';

import store from '../store';
import { Provider } from 'react-redux';
import PublicRoute from './routing/PublicRoute';

export default class App extends Component {
    render() {
        return (
            <div className='container'>
                <Provider store={store}>
                    <BrowserRouter>
                        <Switch>
                            <AppRoute exact path='/dashboard' component={Dashboard} />
                            <PublicRoute exact path='/login' component={Login} />
                            <PublicRoute exact path='/forgot-password' component={ForgotPassword} />
                            <PublicRoute exact path='/signup' component={Signup} />
                            <PublicRoute exact path='/email/verification/:token' component={Verification} />
                            <PublicRoute exact path='/' component={Home} />
                        </Switch>
                    </BrowserRouter>
                </Provider>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
