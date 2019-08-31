import { Button } from 'antd';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';
import { updateCard } from '../../../actions/billingActions';

class UpdateCard extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            isLoading: false,
            button: 'Update Card'
        }

        this.styles = {
            base: {
                fontSize: '18px',
                fontFamily: 'Consolas, monospace',
                letterSpacing: '.2px',

                '::placeholder': {
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    color: '#B1B8C1'
                }
            }
        };

        this.classes = {
            base: 'update-card-form'
        }
    }

    render() {
        return (
            <div>
                { this.props.error ? <p className='generic-form-error'>{this.props.error}</p> : '' }
                <form onSubmit={this.handleSubmit}>
                    <CardElement onReady={c => this._element = c} classes={this.classes} style={this.styles} />
                    <div className='account-form-actions'>
                        <Button
                            type="primary"
                            size={'large'}
                            loading={this.state.isLoading || this.props.isLoading}
                            onClick={this.handleSubmit}
                        >
                            {this.state.button}
                        </Button>
                    </div>
                </form>
            </div>
        )
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ isLoading: true });

        this.props.stripe.createToken()
            .then(({ token }) => {
                return this.props.updateCard(token.id);
            })
            .then(() => {
                this.setState({ isLoading: false });
                this._element.clear();

                if (!this.props.error) {
                    this.setState({ ...this.state, button: 'Updated!' });
                }
            })
            .catch(err => {
                this.setState({ isLoading: false });
            });
    }
}

const mapStateToProps = state => ({
    error: state.billing.error
});

const mapDispatchToProps = dispatch => ({
    updateCard: token => dispatch(updateCard(token))
});

export default injectStripe(connect(mapStateToProps, mapDispatchToProps)(UpdateCard));
