import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom'

import { emit } from '@reducers/sockets'

import GameContext from '@contexts/GameContext'

import { Button } from '@components';

export default () => {
    const history = useHistory()
    const { game, player } = useContext(GameContext)

    const { gameCode, turn } = game || {}
    const { playerId } = player || {}

    const changeTurn = async () => {
        await emit('change-turn', { gameCode })
    }

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
            {
                turn === playerId &&
                <Button
                    onClick={() => changeTurn()}
                    content="Change Turn"
                    type="primary"
                />
            }
        </div>

    );
};
