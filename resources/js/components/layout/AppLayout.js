import React from 'react';
import Sidebar from './Sidebar';
import Modals from '../modals/Modals';

const AppLayout = ({ children }) => {
    return (
        <div className="app-page">
            <div id="navigation"><Sidebar/></div>
            <div className="wrapper">{children}</div>
            <Modals />
        </div>
    );
};

export default AppLayout;
