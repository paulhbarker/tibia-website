import React, { Component } from 'react';
import { Form, Button } from 'antd';
import { Field, reduxForm } from 'redux-form'
import Input from './Input';
import { validateKeyword } from '../../validation/keywordValidation';
import { connect } from 'react-redux';
const FormItem = Form.Item;

class KeywordForm extends Component {
    render() {
        const { handleSubmit, dirty, error, submitting } = this.props;
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
                <Form
                    onSubmit={handleSubmit}
                    layout={formLayout}
                    style={{ width: '100%', maxWidth: '400px' }}
                    className='keyword-form'
                >
                    <FormItem
                        {...formItemLayout}
                        label={'Keyword'}
                        hasFeedback={dirty}
                        validateStatus={this.validateStatus()}
                        help={this.shouldShowHelp() ? error : ''}
                    >
                        <Field name='name' component={Input} type='text' />
                    </FormItem>
                    <FormItem {...buttonItemLayout}>
                        <Button type="primary" size={'large'} onClick={handleSubmit} loading={submitting}>
                            { submitting ? 'Updating...' : 'Update' }
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }

    shouldShowHelp() {
        return !this.props.pristine && this.props.invalid;
    }

    validateStatus() {
        if (this.props.pristine) {
            return null;
        }

        if (this.props.asyncValidating) {
            return 'validating'
        }

        if (this.props.invalid) {
            return 'error'
        }

        return 'success';
    }
}

const mapStateToProps = state => ({
    initialValues: { name: state.keyword.name }
});

export default connect(mapStateToProps)(reduxForm({
    form: 'keyword',
    enableReinitialize: true,
    asyncValidate: validateKeyword,
    asyncChangeFields: ['name'],
})(KeywordForm));
