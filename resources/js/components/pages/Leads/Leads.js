import React from 'react';
import PageContent from '../../layout/PageContent';
import LeadTable from './LeadTable';

const Leads = () => {
    return (
        <PageContent title={'Leads'} subHeader={true}>
            <LeadTable />
        </PageContent>
    );
};

export default Leads;
