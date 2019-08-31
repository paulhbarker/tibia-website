import React, { Component } from 'react';
import { Form, Button } from 'antd';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import Input from './Input';

const FormItem = Form.Item;

class ContactInfoForm extends Component {
    render() {
        const formLayout = 'horizontal';

        const labelWidth = 6;
        const inputWidth = 18

        const formItemLayout = {
            labelCol: { span: labelWidth },
            wrapperCol: { span: inputWidth },
        }

        const buttonItemLayout = {
            wrapperCol: { span: inputWidth, offset: labelWidth }
        }

        return (
            <div>
                <Form layout={formLayout} style={{ width: '100%', maxWidth: '400px'}}>
                    <FormItem label={'Email'} {...formItemLayout}>
                        <Field name='email' component={Input} type='email'/>
                    </FormItem>
                    <FormItem label={'Phone'} {...formItemLayout}>
                        <Field name='phone' component={Input} type='tel'/>
                    </FormItem>
                    <FormItem {...buttonItemLayout}>
                        <Button
                            type="primary"
                            size={'large'}
                            loading={this.props.submitting}
                            onClick={this.props.handleSubmit}
                        >
                            Save
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    initialValues: state.settings.profile
});

export default connect(mapStateToProps)(reduxForm({
    form: 'contactInfo',
    enableReinitialize: true
})(ContactInfoForm));
