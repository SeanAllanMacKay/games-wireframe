import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom'

import { emit } from '@reducers/sockets'

import GameContext from '@contexts/GameContext'

import { Button } from '@components';

import {
    CrownOutlined
} from '@ant-design/icons';

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

    const allIn = async (values) => {
        await emit('all-in', values)
    }

    const leaveGame = async () => {
        await emit('leave-game', { gameCode, playerId })
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
            {players.map(({ name, playerId: currentPlayerId }) => (
                <div
                    style={{
                        position: 'relative'
                    }}
                >
                    {
                        turn === currentPlayerId &&
                        <CrownOutlined
                            style={{
                                position: 'absolute',
                                left: '-20px',
                                top: '3px'
                            }}
                        />
                    }
                    
                    <p>{name}</p>
                </div>
            ))}

            {
                turn === playerId &&
                <Button
                    onClick={() => allIn({ gameCode })}
                    content="All In!"
                    type="primary"
                />
            }

            <Button
                onClick={() => leaveGame()}
                content="Leave Game"
                type="link"
            />
        </div>
    )
};
