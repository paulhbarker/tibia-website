import React, { Component } from 'react';
import DashboardCard from '../../layout/DashboardCard';
import ListingCard from './ListingCard';

class PopularListings extends Component {
    render() {
        return (
            <div className='dashboard-row'>
                <DashboardCard>
                    <ListingCard/>
                </DashboardCard>
                <DashboardCard>
                    <ListingCard/>
                </DashboardCard>
                <DashboardCard>
                    <ListingCard/>
                </DashboardCard>
                <DashboardCard>
                    <ListingCard/>
                </DashboardCard>
            </div>
        )
    }
}

export default PopularListings;
