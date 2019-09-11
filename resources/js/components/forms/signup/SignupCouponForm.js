import React, { Component } from 'react';
import { Button } from 'antd';
import { reduxForm, Field } from 'redux-form';
import LoginInput from '../login/LoginInput';

class SignupInfoForm extends Component {
    render() {
        const buttonStyle = {
            height: '50px',
            padding: '0 28px',
            fontWeight: 'bold',
            borderRadius: '50px',
        };

        const { submitting, handleSubmit, pristine } = this.props;

        return (
            <div>
                <p className='m-t-40'>
                    If you're arriving here with a coupon in hand, now's the time to enter it!
                    If you don't have a coupon, just skip this step.
                </p>
                <form onSubmit={handleSubmit} onKeyDown={e => this.handleKeyDown(e, handleSubmit)}>
                    <div className='account-form-fields'>
                        <div className='account-input-group'>
                            <Field name='coupon' label="Coupon" component={LoginInput} type='text'/>
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
                            { pristine ? 'Skip' : 'Next' }
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
    form: 'signupCoupon',
    enableReinitialize: true
})(SignupInfoForm);
