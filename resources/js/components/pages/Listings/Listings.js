import React from 'react';
import PageContent from '../../layout/PageContent';
import ListingsTable from './ListingTable';

const Listings = () => {
    return (
        <PageContent title={'Listings'} subHeader={true}>
            <ListingsTable/>
        </PageContent>
    );
};

export default Listings;
