import React, { Component } from 'react';
import PageContent from '../../layout/PageContent';
import PageCard from '../../layout/PageCard';
import UpdatePasswordForm from '../../forms/UpdatePasswordForm';
import { connect } from 'react-redux';
import validatePassword from '../../../validation/passwordValidation';
import { updatePassword } from '../../../actions/profileActions';

class Security extends Component {
    constructor(props) {
        super(props);

        this.updatePassword = this.updatePassword.bind(this);
    }

    render() {
        return (
            <PageContent title={'Security'}>
                <PageCard>
                    <h2>Update Password</h2>
                    <p className='m-b-40'>
                        Passwords must be at least 8 characters long. It's a good idea
                        to add capital letters, symbols, and numbers to strengthen
                        your password.
                    </p>
                    <UpdatePasswordForm onSubmit={this.updatePassword}/>
                </PageCard>
            </PageContent>
        );
    }

    updatePassword(values) {
        return validatePassword(values)
            .then(() => this.props.updatePassword(values));
    }
};

const mapDispatchToProps = dispatch => ({
    updatePassword: values => dispatch(updatePassword(values))
});

export default connect(null, mapDispatchToProps)(Security);
