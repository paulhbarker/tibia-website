import React, { Component } from 'react';
import Calendar from '../../icons/Calendar';
import Edit from '../../icons/Edit';
import { Button } from 'antd';

class ListingCard extends Component {
    render() {
        return (
            <div className='dashboard-listing'>
                <div className='listing-lead-number-wrapper'>
                    <div className='listing-lead-number'>14</div>
                </div>
                <div className='listing-name'>7417 Kings Wharf Ln <Edit /></div>
                <div className='listing-desc'>Lorem ipsum dolor sit amet.</div>
                <Button className='listing-button' size={'large'} type={'primary'} ghost={true}>View Leads</Button>
                <div className='listing-duration'><Calendar />10 days</div>
            </div>
        )
    }
}

export default ListingCard;
