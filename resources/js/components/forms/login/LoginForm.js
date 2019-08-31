import React, { Component } from 'react';
import { Button } from 'antd';
import { reduxForm, Field } from 'redux-form';
import LoginInput from './LoginInput';

class LoginForm extends Component {
    render() {
        const buttonStyle = {
            height: '50px',
            padding: '0 28px',
            fontWeight: 'bold',
            borderRadius: '50px',
        };

        const { submitting, handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit} onKeyDown={(e) => this.handleKeyDown(e, handleSubmit)}>
                <div className='account-form-fields'>
                    <div className='account-input-group'>
                        <Field name='email' label="Your e-mail address" component={LoginInput} type='email'/>
                    </div>
                    <div className='account-input-group'>
                        <Field name='password' label="Password" component={LoginInput} type='password'/>
                    </div>
                </div>

                <div className='account-form-actions'>
                    <Button
                        type="primary"
                        size={'large'}
                        style={buttonStyle}
                        loading={submitting}
                        onClick={handleSubmit}
                    >
                        Log in
                    </Button>
                </div>
            </form>
        )
    }

    handleKeyDown(e, cb) {
        if (e.key === 'Enter' && e.shiftKey === false) {
            e.preventDefault();
            cb();
        }
    };
}

export default reduxForm({
    form: 'login',
    enableReinitialize: true
})(LoginForm);
