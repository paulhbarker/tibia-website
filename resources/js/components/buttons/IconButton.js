import React from 'react';

const IconButton = ({ icon, onClick, children }) => {
    const Icon = icon;

    return (
        <button className='btn-icon' onClick={onClick}>
            { Icon ? <Icon /> : children }
        </button>
    );
};

export default IconButton;
