import { connect } from 'react-redux';
import React, { Component } from 'react';
import PageCard from '../../layout/PageCard';
import PageContent from '../../layout/PageContent';
import DisplayNameForm from '../../forms/DisplayNameForm';
import validateProfile from '../../../validation/profileValidation';
import { getProfile, updateProfile } from '../../../actions/profileActions';

class Profile extends Component {
    componentDidMount() {
        this.props.getProfile();
    }

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    render() {
        return (
            <PageContent title={'Profile'}>
                <PageCard>
                    <h2>Display Name</h2>
                    <p className='m-b-40'>
                        This will be displayed to potential clients on your
                        listing page. It also allows us to make our support
                        experience much more personal.
                    </p>
                    <DisplayNameForm onSubmit={this.handleSubmit}/>
                </PageCard>
            </PageContent>
        );
    }

    handleSubmit(values) {
        const { profile } = this.props;

        return validateProfile(values)
            .then(() => this.props.updateProfile(profile, values));
    }
};

const mapStateToProps = state => ({
    isLoading: state.ui.profile.loading,
    profile: state.settings.profile
});

const mapDispatchToProps = dispatch => ({
    getProfile: () => dispatch(getProfile()),
    updateProfile: (prev, next) => dispatch(updateProfile(prev, next)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
