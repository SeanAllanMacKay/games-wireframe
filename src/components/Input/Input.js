import React from 'react';

import { Input } from 'antd'

export default ({ placeholder, value, onChange, onBlur, style }) =>  (
    <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={{
            height: '60px',
            fontSize: '25px',
            ...style
        }}
    />
);