import React from 'react';

import { primaryColor } from '@config/colors'
import { name } from '@config/constants'

export default () => (
    <div
        style={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: primaryColor,
            padding: '5px 30px',
            height: '55px',
            width: '100vw'
        }}
    >
        <h1
            style={{
                color: 'white',
                margin: 0,
                textTransform: 'uppercase'
            }}
        >
            {name}
        </h1>
    </div>
);
