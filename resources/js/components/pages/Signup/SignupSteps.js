import { Steps } from 'antd';
import React, { Component } from 'react';
import StepsAnimator from './StepsAnimator';

class SignupSteps extends Component {
    render() {
        const Step = Steps.Step;

        return (
            <StepsAnimator in={this.props.step !== 4}>
                <div className='signup-steps'>
                    <h1>Create an account</h1>
                    <Steps progressDot current={this.props.step - 1} style={{ maxWidth: '700px', marginBottom: '40px' }}>
                        <Step title="Credentials" description="Account login." />
                        <Step title="Player" description="Create a player." />
                        <Step title="Confirm" description="Verify info." />
                    </Steps>
                </div>
            </StepsAnimator>
        );
    }
}

export default SignupSteps;
