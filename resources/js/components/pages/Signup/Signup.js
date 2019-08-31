import { connect } from 'react-redux';
import SignupSteps from './SignupSteps';
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import SignupInfoForm from '../../forms/signup/SignupInfoForm';
import SignupCouponForm from '../../forms/signup/SignupCouponForm';
import SignupBillingForm from '../../forms/signup/SignupBillingForm';
import { validateCoupon, validateEmail } from '../../../validation/signupValidation';
import {
    cancelSignup, completeStepOne, completeStepTwo,
    completeStepThree, advance, retrogress, createAccount
} from '../../../actions/signupActions';
import SignupFormAnimator from '../../forms/signup/SignupAnimations';
import DotLoader from '../../loaders/DotLoader';

class Signup extends Component {
    constructor(props) {
        super(props);

        this.renderStep = this.renderStep.bind(this);
        this.completeStepOne = this.completeStepOne.bind(this);
        this.completeStepTwo = this.completeStepTwo.bind(this);
        this.completeStepThree = this.completeStepThree.bind(this);
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to={'/dashboard'}/>
        }

        const { isCreating, signupInfo: { error } } = this.props;

        return (
            <div>
                <div className="signup-page">

                    <SignupSteps step={this.props.signupInfo.step} />

                    <div className="account-form">
                        { this.renderStep() }
                    </div>

                </div>
            </div>
        )
    }

    renderStep() {
        const { step } = this.props.signupInfo;

        return (
            <React.Fragment>
                <SignupFormAnimator render={() => this.renderInfoForm()} in={step === 1}/>
                <SignupFormAnimator render={() => this.renderCouponForm()} in={step === 2}/>
                <SignupFormAnimator render={() => this.renderBillingForm()} in={step === 3}/>
                <SignupFormAnimator render={() => this.renderLoader()} in={step === 4}/>
            </React.Fragment>
        )
    }

    renderInfoForm() {
        return <SignupInfoForm onSubmit={this.completeStepOne}/>
    }

    renderCouponForm() {
        return <SignupCouponForm onSubmit={this.completeStepTwo}/>
    }

    renderBillingForm() {
        return <SignupBillingForm onSubmit={this.completeStepThree}/>
    }

    renderLoader() {
        return (
            <div className='signup-creating-account'>
                <h1>Almost there!</h1>
                <p>
                    We're just making sure all your details are correct.
                    You'll be logged into your new account in a minute!
                </p>
                <DotLoader />
            </div>
        )
    }

    completeStepOne(values) {
        return validateEmail(values)
            .then(() => this.props.advanceOne(values));
    }

    completeStepTwo(values) {
        return validateCoupon(values)
            .then(coupon => this.props.advanceTwo({ coupon }))
            .catch(() => this.props.advanceTwo({ coupon: null }));
    }

    completeStepThree(token) {
        this.props.advanceThree({ stripeToken: token });

        this.props.createAccount(this.props.signupInfo);
    }
}

const mapStateToProps = state => ({
    isAuthenticated: !_.isEmpty(state.auth.token),
    isCreating: state.signup.loading,
    signupInfo: state.signup,
});

const mapDispatchToProps = dispatch => ({
    advanceOne: values => dispatch(completeStepOne(values)),
    advanceTwo: values => dispatch(completeStepTwo(values)),
    advanceThree: values => dispatch(completeStepThree(values)),
    createAccount: values => dispatch(createAccount(values)),
    cancelSignup: () => dispatch(cancelSignup()),
    advance: () => dispatch(advance()),
    retrogress: () => dispatch(retrogress()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
