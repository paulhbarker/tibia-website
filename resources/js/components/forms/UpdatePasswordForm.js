import React, { Component } from 'react';
import { Form, Button } from 'antd';
import { reduxForm, Field } from 'redux-form';
import Input from './Input';
import { connect } from 'react-redux';

const FormItem = Form.Item;

class UpdatePasswordForm extends Component {
    render() {
        const { errors } = this.props;

        const formLayout = 'horizontal';

        const labelWidth = 10;
        const inputWidth = 14;

        const formItemLayout = {
            labelCol: { span: labelWidth },
            wrapperCol: { span: inputWidth },
        };

        const buttonItemLayout = {
            wrapperCol: { span: inputWidth, offset: labelWidth }
        };

        return (
            <div>
                <Form layout={formLayout} style={{ width: '100%', maxWidth: '400px' }}>
                    { this.renderErrors() }
                    { this.renderStatus() }
                    <FormItem
                        {...formItemLayout}
                        label={'Current Password'}
                        validateStatus={errors.password_current ? 'error' : 'success'}
                        help={errors.password_current ? errors.password_current : ''}
                    >
                        <Field name='password_current' component={Input} type='password'/>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={'New Password'}
                        validateStatus={errors.password ? 'error' : 'success'}
                        help={errors.password ? errors.password : ''}
                    >
                        <Field name='password' component={Input} type='password'/>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={'Confirm Password'}
                        validateStatus={errors.password_confirmation ? 'error' : 'success'}
                        help={errors.password_confirmation ? errors.password_confirmation : ''}
                    >
                        <Field name='password_confirmation' component={Input} type='password'/>
                    </FormItem>
                    <FormItem {...buttonItemLayout}>
                        <Button
                            type="primary"
                            size={'large'}
                            loading={this.props.submitting}
                            disabled={this.props.pristine}
                            onClick={this.props.handleSubmit}
                        >
                            Save
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }

    renderErrors() {
        const { apiErrors } = this.props;

        if (!apiErrors) {
            return;
        }

        return (
            <p className='generic-form-error ant-col-14 ant-col-offset-10'>
                {apiErrors}
            </p>
        );
    }

    renderStatus() {
        const { successful } = this.props;

        if (!successful) {
            return;
        }

        return (
            <p className='generic-form-success ant-col-14 ant-col-offset-10'>
                Your password has been updated!
            </p>
        );
    }
}

const mapStateToProps = state => ({
    errors: _.get(state, 'form.updatePassword.submitErrors', {}),
    apiErrors: state.password.error,
    successful: state.password.success
});

export default connect(mapStateToProps)(
    reduxForm({
        form: 'updatePassword',
        onSubmitSuccess: (result, dispatch, props) => props.reset()
    })(UpdatePasswordForm)
);
