import React, { Component } from 'react';
import { Button } from 'antd';
import { reduxForm, Field } from 'redux-form';
import LoginInput from '../login/LoginInput';
import SelectField from '../SelectField';
import { validatePlayer } from '../../../validation/signupValidation';

class SignupPlayerForm extends Component {
    render() {
        const vocations = [
            { name: 'Sorceror', value: 1 },
            { name: 'Druid', value: 2 },
            { name: 'Paladin', value: 3 },
            { name: 'Knight', value: 4 },
        ];

        const towns = [
            { name: 'Thais', value: 2 }
        ];

        const genders = [
            { name: 'Male', value: 1 },
            { name: 'Female', value: 2 }
        ];

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
                    Create your first player. You may create more players in the future.
                </p>
                <form onSubmit={handleSubmit} onKeyDown={e => this.handleKeyDown(e, handleSubmit)}>
                    <div className='account-form-fields'>
                        <div className='account-input-group'>
                            <Field name='name' label="Name" component={LoginInput} type='text'/>
                        </div>
                        <div className='account-input-group'>
                            <Field name='vocation' label="Vocation" component={SelectField} options={vocations}/>
                        </div>
                        <div className='account-input-group'>
                            <Field name='sex' label="Gender" component={SelectField} options={genders} />
                        </div>
                        <div className='account-input-group'>
                            <Field name='town' label="Town" component={SelectField} options={towns} />
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
    validate: validatePlayer,
    enableReinitialize: true
})(SignupPlayerForm);
