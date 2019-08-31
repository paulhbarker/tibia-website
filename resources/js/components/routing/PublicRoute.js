import React from 'react';
import CustomRoute from './CustomRoute';
import PublicLayout from '../layout/PublicLayout';

const PublicRoute = props => {
    return (
        <CustomRoute layout={PublicLayout} {...props} />
    );
};

export default PublicRoute;
