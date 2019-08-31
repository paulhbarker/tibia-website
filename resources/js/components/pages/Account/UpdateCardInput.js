import UpdateCard from './UpdateCard';
import React, { Component } from 'react';
import {Elements, StripeProvider } from 'react-stripe-elements';
import R from '../../../constants';

class UpdateCardInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <StripeProvider apiKey={R.key.STRIPE}>
                <Elements>
                    <UpdateCard {...this.props} />
                </Elements>
            </StripeProvider>
        )
    }
}

export default UpdateCardInput;
