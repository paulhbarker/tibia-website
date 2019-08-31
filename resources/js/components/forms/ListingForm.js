import React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import PreviewInput from './PreviewInput';
import FormField from './FormField';
import ListingInfoInput from './ListingInfoInput';
import { Button } from 'antd';
import renderField from './renderField';

let ListingForm = props => {
    const { handleSubmit, pristine, submitting, onCancel, isNew } = props

    return (
        <form onSubmit={handleSubmit}>
            <FormField>
                <div className='field-wrapper'>
                    <label>Address</label>
                    <Field name='address' component={renderField} type='text'/>
                </div>
            </FormField>

            <FormField>
                <div className='field-wrapper'>
                    <label>Price</label>
                    <Field name='price' parse={i => Number(i)} component='input' type='number'/>
                </div>
                <div className='field-wrapper'>
                    <label>Square Footage</label>
                    <Field name='sqft' parse={i => Number(i)} component='input' type='number'/>
                </div>
            </FormField>

            <FormField>
                <div className='field-wrapper'>
                    <label>Bedrooms</label>
                    <Field name='beds' parse={i => Number(i)} component='input' type='number'/>
                </div>
                <div className='field-wrapper'>
                    <label>Bathrooms</label>
                    <Field name='baths' parse={i => Number(i)} component='input' type='number'/>
                </div>
            </FormField>

            <FormField>
                <div className='field-wrapper'>
                    <label>Thumbnail <span>JPG, PNG, BMP, GIF. Max 250 KB</span></label>
                    <Field name="thumb" component={PreviewInput} type="file"/>
                </div>
            </FormField>

            <FormField>
                <div className='field-wrapper'>
                    <label>Additional Listing Info <span>PDF, JPG, PNG. Max 5 MB</span></label>
                    <Field name="details" component={ListingInfoInput} type="file"/>
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
                            : isNew ? 'Add Listing' : 'Save Changes' }
                    </Button>
                </div>
            </FormField>
        </form>
    )
}

ListingForm = reduxForm({ form: 'listingForm' })(ListingForm);

const mapStateToProps = (state) => ({
    initialValues: state.listings.updating[0]
});

export default connect(mapStateToProps)(ListingForm);
