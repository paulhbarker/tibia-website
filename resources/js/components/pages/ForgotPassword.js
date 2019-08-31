import Logo from '../icons/Logo';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import SetPasswordForm from '../forms/SetPasswordForm';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';
import { validateEmail } from '../../validation/emailValidation';
import { validatePassword } from '../../validation/resetValidation'
import { recoverPassword, setPassword } from '../../actions/authActions';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        const query = new URLSearchParams(this.props.location.search)

        const email = query.get('email');
        const token = query.get('token');

        const isResetting = (email && token);
        const isRecovering = ! isResetting;

        const isComplete = false;

        this.state = {
            email,
            token,
            isResetting,
            isRecovering,
            isComplete
        };

        this.handleRecovery = this.handleRecovery.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    render() {
        const title = this.state.isRecovering
            ? 'Forgot Password'
            : 'Set Password';

        const descr = this.state.isRecovering
            ? 'Provide your email address, and we\'ll send you instructions to reset your password via email.'
            : 'Choose a new password. Passwords must be at least 8 characters long.';

        return (
            <div className="login-page">
                <div className="login-page-logo">
                    <Logo></Logo>
                </div>
                <div className="account-form login-form">
                    <h1>{ title }</h1>
                    <p>{ descr }</p>

                    { this.state.isComplete
                        ? this.state.isRecovering
                            ? <p className='generic-form-success'>An email has been sent!</p>
                            : <p>Your password has been set. Please <Link to='/login'>log in</Link> to continue.</p>
                        : ''
                    }

                    { this.props.error &&
                        <p className='generic-form-error'>
                            { this.props.error }
                        </p>
                    }

                    { this.state.isRecovering
                        ? <ForgotPasswordForm onSubmit={this.handleRecovery}/>
                        : <SetPasswordForm onSubmit={this.handleReset}/>
                    }
                </div>
            </div>
        )
    }

    handleRecovery(values) {
        return validateEmail(values)
            .then(() => this.props.recoverPassword(values.email))
            .then(() => {
                if (!this.props.error) {
                    this.setState({ isComplete: true });
                }
            });
    }

    handleReset(values) {
        return validatePassword(values)
            .then(() => {
                values.email = this.state.email;
                values.token = this.state.token;

                return this.props.setPassword(values);
            })
            .then(() => {
                if (!this.props.error) {
                    this.setState({ isComplete: true });
                }
            });
    }
}

const mapStateToProps = state => ({
	error: state.password.error
});

const mapDispatchToProps = dispatch => ({
	recoverPassword: email => dispatch(recoverPassword(email)),
    setPassword: values => dispatch(setPassword(values))
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
