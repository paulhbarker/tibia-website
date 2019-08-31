import React from 'react';
import Header from './Header';
import SubHeader from './SubHeader';

const PageContent = ({ title, children, subHeader = false }) => {
    const hasSubHeader = subHeader;

    return (
        <div className="content">
            <Header title={title}/>
            { hasSubHeader ? <SubHeader /> : ''}
            <div className="page-panel">
                <div className="page-panel-inner">
                    <div id='main' className='main page-panel-content'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageContent;
