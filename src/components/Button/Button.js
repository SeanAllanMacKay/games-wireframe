import React from 'react';

import { Button, Tooltip } from 'antd'

export default ({ content, disabled, type, tooltip, style, onClick }) =>  (
    <Tooltip
        title={tooltip}
    >
        <Button
            disabled={disabled}
            type={type}
            style={{
                width: '300px',
                height: '60px',
                fontSize: '25px',
                ...style
            }}
            onClick={onClick}
        >
            {content}
        </Button>
    </Tooltip>
);