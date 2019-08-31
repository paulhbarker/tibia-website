import React, { Component } from 'react';
import { Form, Button } from 'antd';
import { Field, reduxForm } from 'redux-form'
import Input from './Input';
import { connect } from 'react-redux';

const FormItem = Form.Item;

class DisplayNameForm extends Component {
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
                <Form onSubmit={this.props.handleSubmit} layout={formLayout} style={{ width: '100%', maxWidth: '400px'}}>
                    <FormItem label={'First Name'} {...formItemLayout}>
                        <Field name='first_name' component={Input} type='text'/>
                    </FormItem>
                    <FormItem label={'Last Name'} {...formItemLayout}>
                        <Field name='last_name' component={Input} type='text'/>
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

const mapStateToProps = (state) => ({
    initialValues: state.settings.profile
});

export default connect(mapStateToProps)(reduxForm({
    form: 'displayName',
    enableReinitialize: true
})(DisplayNameForm));
