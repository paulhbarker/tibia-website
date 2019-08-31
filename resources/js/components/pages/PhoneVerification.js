import Exit from '../icons/Exit';
import Check from '../icons/Check';
import React, { Component } from 'react';
import VerificationAnimator from '../animation/VerificationAnimator';

class EmailVerification extends Component {
    componentDidMount() {
        const token = this.props.match.params.token;

        this.verifyEmail(token);
    }

    constructor(props) {
        super(props);

        this.state = {
            verifying: true,
            verified: false,
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
                <p>Your email address has been verified. You may now close this window.</p>
            </div>
        )
    }

    renderFailed() {
        return (
            <div className='verification-status'>
                <Exit height={48} width={48}/>
                <h2>Verification Failure!</h2>
                <p>The link you used has probably expired (or is no longer valid). Try resending a verification text.</p>
            </div>
        )
    }

    verifyEmail(token) {
        axios.post('/api/v1/verify/phone', { token })
            .then(() => {
                this.setState({ verified: true, verifying: false})
            })
            .catch(() => {
                this.setState({ verified: false, verifying: false})
            })
    }
}

export default EmailVerification;
