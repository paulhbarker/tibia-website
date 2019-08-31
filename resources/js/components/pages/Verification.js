import Exit from '../icons/Exit';
import Check from '../icons/Check';
import React, { Component } from 'react';
import VerificationAnimator from '../animation/VerificationAnimator';

class Verification extends Component {
    componentDidMount() {
        const token = this.props.match.params.token;

        this.verify(token);
    }

    constructor(props) {
        super(props);

        this.state = {
            verifying: true,
            verified: false,
        }

        if (this.props.match.path.includes('email')) {
            this.state.verifyUrl = '/api/v1/verify/email';
            this.state.type = 'email address';
        }

        if (this.props.match.path.includes('phone')) {
            this.state.verifyUrl = '/api/v1/verify/phone';
            this.state.type = 'phone number';
        }
    }

    render() {
        return (
            <div className='verification-page'>
                <React.Fragment>
                    <VerificationAnimator render={() => this.renderPending()} in={this.state.verifying}/>
                    <VerificationAnimator render={() => this.renderPassed()} in={this.state.verified && !this.state.verifying}/>
                    <VerificationAnimator render={() => this.renderFailed()} in={!this.state.verified && !this.state.verifying}/>
                </React.Fragment>
            </div>
        )
    }

    renderPending() {
        return (
            <div className='verification-status'>
                <h2>Verifying...</h2>
            </div>
        )
    }

    renderPassed() {
        return (
            <div className='verification-status'>
                <Check height={48} width={48} color={'green'}/>
                <h2>Verification Success!</h2>
                <p>Your {this.state.type} has been verified. You may now close this window.</p>
            </div>
        )
    }

    renderFailed() {
        return (
            <div className='verification-status'>
                <Exit height={48} width={48}/>
                <h2>Verification Failure!</h2>
                <p>The link you used has probably expired (or is no longer valid). Try resending a verification email.</p>
            </div>
        )
    }

    verify(token) {
        axios.post(this.state.verifyUrl, { token })
            .then(() => {
                this.setState({ verified: true, verifying: false})
            })
            .catch(() => {
                this.setState({ verified: false, verifying: false})
            })
    }
}

export default Verification;
