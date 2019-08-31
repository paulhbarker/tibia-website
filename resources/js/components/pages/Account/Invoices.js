import React, { Component } from 'react';
import { getInvoices } from '../../../actions/billingActions';
import { connect } from 'react-redux';
import moment from 'moment';

class Invoices extends Component {
    componentDidMount() {
        this.props.getInvoices();
    }

    render() {
        const { invoices } = this.props;

        return (
            <table className='table table-invoices'>
                <thead>
                <tr>
                    <th className='date-column'>Date</th>
                    <th className='amount-column'>Amount</th>
                </tr>
                </thead>
                <tbody>
                { invoices.map((i, index) => (
                    <tr key={index} onClick={() => this.downloadPdf(i)}>
                        <td>{this.formatDate(i.date)}</td>
                        <td>{this.formatPrice(i.total)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        )
    }

    downloadPdf(invoice) {
        window.open(invoice.invoice_pdf, '_blank');
    }

    formatDate(timestamp) {
        timestamp = timestamp * 1000;

        return moment(timestamp).format('LL');
    }

    formatPrice(price) {
        if (price === 0) {
            return '$0.00';
        }

        if (price) {
            return `$ ${this.f(price/100)}`;
        }
    }

    f(x) {
        if (x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }
}

const mapStateToProps = state => ({
    invoices: state.billing.invoices,
});

const mapDispatchToProps = dispatch => ({
    getInvoices: () => dispatch(getInvoices())
});

export default connect(mapStateToProps, mapDispatchToProps)(Invoices);
