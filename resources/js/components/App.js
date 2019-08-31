import Home from './pages/Home';
import ReactDOM from 'react-dom';
import Login from './pages/Login';
import Keyword from './pages/Keyword';
import Leads from './pages/Leads/Leads';
import React, { Component } from 'react';
import AppRoute from './routing/AppRoute';
import Signup from './pages/Signup/Signup';
import Billing from './pages/Account/Billing';
import PublicListings from './pages/Listings/PublicListings';
import Profile from './pages/Account/Profile';
import Verification from './pages/Verification';
import Listings from './pages/Listings/Listings';
import Dashboard from './pages/Dashboard/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import { BrowserRouter, Switch } from 'react-router-dom';
import Notifications from './pages/Account/Notifications';

import store from '../store';
import { Provider } from 'react-redux';
import Security from './pages/Account/Security';
import PublicRoute from './routing/PublicRoute';

export default class App extends Component {
    render() {
        return (
            <div className='container'>
                <Provider store={store}>
                    <BrowserRouter>
                        <Switch>
                            <AppRoute exact path='/dashboard' component={Dashboard} />
                            <AppRoute exact path='/leads' component={Leads} />
                            <AppRoute exact path='/keyword' component={Keyword} />
                            <AppRoute exact path='/listings' component={Listings} />
                            <AppRoute exact path='/profile' component={Profile} />
                            <AppRoute exact path='/security' component={Security} />
                            <AppRoute exact path='/notifications' component={Notifications} />
                            <AppRoute exact path='/billing' component={Billing} />
                            <PublicRoute exact path='/login' component={Login} />
                            <PublicRoute exact path='/forgot-password' component={ForgotPassword} />
                            <PublicRoute exact path='/signup' component={Signup} />
                            <PublicRoute exact path='/email/verification/:token' component={Verification} />
                            <PublicRoute exact path='/phone/verification/:token' component={Verification} />
                            <PublicRoute exact path='/:keyword' component={PublicListings} />
                            <PublicRoute exact path='/' component={Home} />
                        </Switch>
                    </BrowserRouter>
                </Provider>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
