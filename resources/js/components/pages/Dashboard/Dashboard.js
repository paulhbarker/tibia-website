import React from 'react';
import PageContent from '../../layout/PageContent';
import SubHeader from '../../layout/SubHeader';
import DashboardCard from '../../layout/DashboardCard';
// import PopularListings from './PopularListings';
import LeadInfo from './LeadInfo';

const Dashboard = () => {
    return (
        <PageContent title={'Dashboard'}>
            <LeadInfo/>

            {/*<h2 className='dashboard-header'>Popular Listings</h2>*/}
            {/*<PopularListings/>*/}
        </PageContent>
    );
};

export default Dashboard;
