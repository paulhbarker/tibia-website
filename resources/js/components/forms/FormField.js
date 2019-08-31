import React from 'react';

const FormField = ({ children }) => {
    let cols = 1;

    if (Array.isArray(children)) {
        cols = children.length;
    }

    return (
        <div className={`form-field col-${cols}`}>
            {children}
        </div>
    );
};

export default FormField;
