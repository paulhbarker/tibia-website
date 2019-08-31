import CreditCard from './CreditCard';
import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import R from '../../constants';

class CreditCardInput extends Component {
    render() {
        return (
            <StripeProvider apiKey={R.key.STRIPE}>
                <Elements>
                    <CreditCard {...this.props} />
                </Elements>
            </StripeProvider>
        )
    }
}

export default CreditCardInput;
