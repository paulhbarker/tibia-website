import Logo from '../icons/Logo';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import LoginForm from '../forms/login/LoginForm';
import { Redirect, Link } from 'react-router-dom';
import { authenticate } from '../../actions/authActions';
import validateLogin from '../../validation/loginValidation';

class Login extends Component {
    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to={'/dashboard'}/>;
        }

        const { authError } = this.props;

        return (
            <div className="login-page">
                <div className="login-page-logo">
                    <Logo />
                </div>
                <div className="account-form login-form">
                    <h1>Sign in</h1>
                    <p className={authError ? 'has-error' : ''}>
                        { authError ? authError : 'Welcome back to Tibia!' }
                    </p>

                    <LoginForm onSubmit={this.login}/>
                    <div className='login-form-links'>
                        <Link to='/signup'>Sign up</Link>
                        <Link to='/forgot-password'>Forgot your password?</Link>
                    </div>
                </div>
            </div>
        );
    }

    login(values) {
        return validateLogin(values)
            .then(() => this.props.authenticate(values));
    }
}

const mapStateToProps = state => ({
    isAuthenticated: !_.isEmpty(state.auth.token),
    authError: state.auth.error
});

const mapDispatchToProps = dispatch => ({
    authenticate: values => dispatch(authenticate(values))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
