import React, { Component } from 'react';
import CustomRoute from './CustomRoute';
import AppLayout from '../layout/AppLayout';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class AppRoute extends Component {
    render() {
        return this.props.isAuthenticated
            ? <CustomRoute layout={AppLayout} {...this.props} />
            : <Redirect to={'/login'} />;
    }
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token
});

export default connect(mapStateToProps)(AppRoute);
