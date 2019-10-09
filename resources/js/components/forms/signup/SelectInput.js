import React from 'react';

const SelectInput = ({ input, label, options, name, meta: { pristine, touched, error } }) => {
    const hasErrors = touched && error;

    return (
        <React.Fragment>
            <select {...input} className={!pristine ? 'filled' : ''}>
                { options.map((option, i) => (
                    <option key={i} value={getValue(option)}>{getOption(option)}</option>
                ))}
            </select>
            <label htmlFor={name} className={hasErrors ? 'has-error' : ''}>{ hasErrors ? error : label }</label>
        </React.Fragment>
    );
};

const getOption = option => {
    return Object.keys(option)[0];
};

const getValue = option => {
    return option[Object.keys(option)[0]];
};

export default SelectInput;
