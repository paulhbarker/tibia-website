import { Button } from 'antd';
import React, { Component } from 'react';
import LoginInput from './login/LoginInput';
import { reduxForm, Field } from 'redux-form';

class SetPasswordForm extends Component {
    render() {
        const buttonStyle = {
            height: '50px',
            padding: '0 28px',
            fontWeight: 'bold',
            borderRadius: '50px',
        };

        const { submitting, handleSubmit, submitSucceeded } = this.props;

        return (
            <form onSubmit={handleSubmit} onKeyDown={(e) => this.handleKeyDown(e, handleSubmit)}>
                <div className='account-form-fields'>
                    <div className='account-input-group'>
                        <Field name='password' label="New password" component={LoginInput} type='password'/>
                    </div>
                    <div className='account-input-group'>
                        <Field name='password_confirmation' label="Confirm password" component={LoginInput} type='password'/>
                    </div>
                </div>

                <div className='account-form-actions'>
                    <Button
                        type="primary"
                        size={'large'}
                        style={buttonStyle}
                        loading={submitting}
                        onClick={handleSubmit}
                        disabled={submitSucceeded}
                    >
                        Set Password
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
    form: 'setPassword',
    enableReinitialize: true,
})(SetPasswordForm);
