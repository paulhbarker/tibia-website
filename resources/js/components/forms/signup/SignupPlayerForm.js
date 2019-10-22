import React, { Component } from 'react';
import { Button } from 'antd';
import { reduxForm, Field } from 'redux-form';
import LoginInput from '../login/LoginInput';
import SelectField from '../SelectField';
import { validatePlayer } from '../../../validation/signupValidation';
import C from '../../../constants';

class SignupPlayerForm extends Component {
    render() {
        const vocations = [
            { name: 'Sorceror', value: C.vocations.SORCEROR },
            { name: 'Druid', value: C.vocations.DRUID },
            { name: 'Paladin', value: C.vocations.PALADIN },
            { name: 'Knight', value: C.vocations.KNIGHT },
        ];

        const towns = [
            { name: 'Thais', value: C.towns.THAIS }
        ];

        const genders = [
            { name: 'Male', value: C.sex.MALE },
            { name: 'Female', value: C.sex.FEMALE }
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
