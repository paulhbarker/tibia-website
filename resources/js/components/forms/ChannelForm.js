import React from 'react';
import { Button } from 'antd';
import renderField from './renderField';
import { Field, reduxForm } from 'redux-form';
import FormField from './FormField';

const ChannelForm = props => {
    const { handleSubmit, pristine, submitting, onCancel } = props;

    return (
        <form onSubmit={handleSubmit}>
            <FormField>
                <div className='field-wrapper'>
                    <label>Type</label>
                    <Field name='type' component='select'>
                        <option />
                        <option value='phone'>Phone</option>
                        <option value='email'>Email</option>
                    </Field>
                </div>
            </FormField>
            <FormField>
                <div className='field-wrapper'>
                    <label>Value</label>
                    <Field name='value' component={renderField} type='text'/>
                </div>
            </FormField>
            <FormField>
                <div className='form-controls-wrapper'>
                    <Button disabled={submitting} onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type='primary' disabled={pristine} onClick={handleSubmit} loading={submitting}>
                        { submitting
                            ? 'Saving...'
                            : 'Add Channel' }
                    </Button>
                </div>
            </FormField>
        </form>
    );
};

export default reduxForm({ form: 'channelForm' })(ChannelForm);
