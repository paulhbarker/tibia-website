import { connect } from 'react-redux';
import React, { Component } from 'react';
import CreditCardInput from '../../billing/CreditCardInput';

class SignupBillingForm extends Component {
    render() {
        const { error } = this.props;

        return (
            <div>
                <p>
                    RealtyFlux will automatically continue your membership at the end of your billing
                    cycle and charge the membership fee of <code>{this.getPrice()}</code> to your
                    payment method on a monthly basis until you cancel. There are no refunds or
                    credits for partial months.
                </p>
                { error ? <p className='billing-error'>{error}</p> : ''}
                <CreditCardInput onSubmit={this.props.onSubmit}/>
            </div>
        )
    }

    getPrice() {
        const { coupon } = this.props;

        let price = 1495;

        if (coupon) {
            price -= price * coupon.discount / 100;
        }

        return `$${price / 100}`;
    }
}

const mapStateToProps = state => ({
	coupon: state.signup.coupon,
    error: state.signup.error
});

export default connect(mapStateToProps)(SignupBillingForm);
