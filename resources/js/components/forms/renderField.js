import React from 'react';

const renderField = ({ input, label, type, meta: { touched, error } }) => {
    const hasErrors = touched && error;

    return (
        <div>
            <input {...input} type={type} className={hasErrors ? 'has-error' : ''}/>
            { hasErrors && <div className='input-error'>{error}</div> }
        </div>
    )
}

export default renderField;
