import React from 'react';

const LoginInput = ({ input, label, type, name, meta: { pristine, touched, error } }) => {
    const hasErrors = touched && error;

    return (
        <React.Fragment>
            <input {...input} type={type} className={!pristine ? 'filled' : ''}/>
            <label htmlFor={name} className={hasErrors ? 'has-error' : ''}>{ hasErrors ? error : label }</label>
        </React.Fragment>
    );
};

export default LoginInput;
