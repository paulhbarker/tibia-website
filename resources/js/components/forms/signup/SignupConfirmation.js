import React, { Component } from 'react';
import { connect } from 'react-redux';
import ConfirmField from './../ConfirmField';
import { Button } from 'antd';
import C from '../../../constants';

class SignupConfirmation extends Component {
    render() {
        const buttonStyle = {
            height: '50px',
            padding: '0 28px',
            fontWeight: 'bold',
            borderRadius: '50px',
        };

        const { player } = this.props.signup;

        return (
            <div className="signup-confirmation">
                <div className="info">
                    <div className="card">
                        <h1>Account</h1>
                        <div className="account-info">
                            <ConfirmField title={'Account Name'} value={this.props.signup.name} />
                            <ConfirmField title={'Email Address'} value={this.props.signup.email} />
                            <ConfirmField title={'Password'} value={this.getPasswordDots()} />
                        </div>
                    </div>
                    <div className="card">
                        <h1>Player</h1>
                        <div className="player-info">
                            <ConfirmField title={'Player Name'} value={player.name} />
                            <ConfirmField title={'Vocation'} value={this.getVocation()} />
                            <ConfirmField title={'Gender'} value={this.getSex()} />
                            <ConfirmField title={'Town'} value={this.getTown()} />
                        </div>
                    </div>
                </div>
                <div className="controls">
                    <Button
                        type="primary"
                        size={'large'}
                        style={buttonStyle}
                        onClick={() => this.props.onConfirm()}
                    >
                        Create Account
                    </Button>
                </div>
            </div>
        );
    }

    getPasswordDots() {
        return (
            <span className="password-dots">
                { this.props.signup.password.split('').map(() => '●').join('') }
            </span>
        );
    }

    getVocation() {
        const { vocation } = this.props.signup.player;

        const map = {
            [C.vocations.SORCEROR]: 'Sorceror',
            [C.vocations.DRUID]: 'Druid',
            [C.vocations.PALADIN]: 'Paladin',
            [C.vocations.KNIGHT]: 'Knight',
        };

        return map[vocation];
    }

    getSex() {
        const { sex } = this.props.signup.player;

        const map = {
            [C.sex.MALE]: 'Male',
            [C.sex.FEMALE]: 'Female',
        };

        return map[sex];
    }

    getTown() {
        return 'Thais';
    }
}

const mapStateToProps = state => ({
    signup: state.signup
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SignupConfirmation);
