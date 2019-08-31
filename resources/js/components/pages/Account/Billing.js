import Invoices from './Invoices';
import { Select, Button } from 'antd';
import React, { Component } from 'react';
import PageCard from '../../layout/PageCard';
import UpdateCardInput from './UpdateCardInput';
import PageContent from '../../layout/PageContent';
import RippleLoader from '../../loaders/RippleLoader';

class Billing extends Component {
    render() {
        return (
            <PageContent title={'Billing'}>
                <PageCard>
                    <h2>Subscription</h2>
                    <p className='m-b-30'>
                        We currently offer one, all-inclusive package: <em>RealtyFlux Essentials.</em>
                    </p>
                    <Select className='m-b-20' defaultValue="1" style={{ width: 500, display: 'block' }} disabled={true} size={'large'}>
                        <Option value="1">RealtyFlux Essentials - $14.99/mo</Option>
                    </Select>
                    <Button type={'danger'} size={'large'} ghost={true}>Cancel</Button>
                </PageCard>
                <PageCard>
                    <h2>Payment Info</h2>
                    <p className='m-b-30'>
                        The current card we have on file for you ends in <code>4242</code>. We bill your card each month on the anniversary of your account creation.
                    </p>
                    <UpdateCardInput />
                </PageCard>
                <PageCard>
                    <h2>Invoices { this.props.invoicesLoading ? <RippleLoader /> : ''}</h2>
                    <p>
                        Click on an invoice to download a PDF version.
                    </p>
                    <Invoices />
                </PageCard>
            </PageContent>
        );
    }
};

export default Billing;
