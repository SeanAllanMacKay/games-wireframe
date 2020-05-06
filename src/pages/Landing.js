import React from 'react';
import { useHistory } from 'react-router-dom'

import { Button } from '@components';

export default () => {
    const history = useHistory()
    return (
        <div
            style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Button
                content="Start Game"
                type="primary"
                style={{
                    margin: '0 0 25px 0',
                }}
                onClick={() => history.push('/start-game')}
            />
            <Button
                content="Join Game"
                onClick={() => history.push('/join-game')}
            />
        </div>

    );
};
