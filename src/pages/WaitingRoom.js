import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom'

import { emit } from '@reducers/sockets'

import GameContext from '@contexts/GameContext'

import { Button} from '@components';

export default () => {
    const { game, player } = useContext(GameContext)
    const history = useHistory()

    useEffect(() => {
        if(!game){
            history.push('/')
        }
    }, [game, history])

    const { gameCode, players = [], turn } = game || {}
    const { playerId } = player || {}

    const leaveGame = () => {
        emit('leave-game', { gameCode, playerId })
    }

    return(
        <div
            style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '30px 0 0 0'
            }}
        >
            <h3>{gameCode}</h3>
            <h4>Players</h4>
            {players.map(({ name }) => (
                <p>{name}</p>
            ))}

            <Button
                onClick={() => leaveGame()}
                content="Leave Game"
                type="text"
            />
        </div>
    )
};
