import React, { Component } from 'react';
import { Button } from 'antd';
import { reduxForm, Field } from 'redux-form';
import LoginInput from '../login/LoginInput';
import { validateInfo } from '../../../validation/signupValidation';

class SignupInfoForm extends Component {
    render() {
        const buttonStyle = {
            height: '50px',
            padding: '0 28px',
            fontWeight: 'bold',
            borderRadius: '50px',
        };

        const { submitting, handleSubmit } = this.props;

        return (
            <div>
                <p>
                    Let's start with the easy stuff. Provide your email address and create a password so
                    we can make sure it's you when you come back!
                </p>
                <form onSubmit={handleSubmit} onKeyDown={e => this.handleKeyDown(e, handleSubmit)}>
                    <div className='account-form-fields'>
                        <div className='account-input-group'>
                            <Field name='name' label="Account Name" component={LoginInput} type='text'/>
                        </div>
                        <div className='account-input-group'>
                            <Field name='email' label="Email Address" component={LoginInput} type='email'/>
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
                            Next
                        </Button>
                    </div>
                </form>
            </div>

        );
    }

    handleKeyDown(e, cb) {
        if (e.key === 'Enter' && e.shiftKey === false) {
            e.preventDefault();
            cb();
        }
    };
}

export default reduxForm({
    form: 'signupInfo',
    validate: validateInfo,
    enableReinitialize: true
})(SignupInfoForm);
