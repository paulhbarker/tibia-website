import React, { Component } from 'react';
import { Button } from 'antd';

import { injectStripe, CardElement } from 'react-stripe-elements';

class CreditCard extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            isLoading: false
        }
    }

    render() {
        const classes = { base: 'signup-card-form' };

        return (
            <form onSubmit={this.handleSubmit}>
                <CardElement classes={classes} style={this.creditCardStyles()} />
                <div className='account-form-actions'>
                    <Button
                        type="primary"
                        size={'large'}
                        style={this.buttonStyles()}
                        loading={this.state.isLoading}
                        onClick={this.handleSubmit}
                    >
                        Confirm Order
                    </Button>
                </div>
            </form>
        )
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ isLoading: true });

        this.props.stripe.createToken()
            .then(({ token }) => {
                this.setState({ isLoading: false });

                this.props.onSubmit(token);
            })
            .catch(err => {
                this.setState({ isLoading: false });
            });
    }

    buttonStyles() {
        return {
            height: '50px',
            padding: '0 28px',
            fontWeight: 'bold',
            borderRadius: '50px',
        };
    }

    creditCardStyles() {
        return {
            base: {
                fontSize: '18px',
                fontFamily: 'Consolas, monospace',
                letterSpacing: '.2px',

                '::placeholder': {
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    color: '#B1B8C1'
                }
            }
        }
    }
}

export default injectStripe(CreditCard);
