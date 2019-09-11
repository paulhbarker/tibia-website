import React from 'react';
import { Input as AntInput } from 'antd';

const Input = ({ input, type }) => {
    return (
        <AntInput {...input} type={type} size='large' />
    );
};

export default Input;
