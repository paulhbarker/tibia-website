import React from 'react';

const LinkSection = ({ label, children }) => {
    return (
        <div className='link-section'>
            { label &&
                <div className='nav-section-title'>
                    <div className='nav-section-title-text'>{ label }</div>
                </div>
            }
            {children}
        </div>
    );
};

export default LinkSection;
