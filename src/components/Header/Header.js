import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom'

import { primaryColor } from '@config/colors'
import { name } from '@config/constants'

import GameContext from '@contexts/GameContext'

export default () => {
    const location = useLocation()
    const { game } = useContext(GameContext)
    const { gameCode } = game || {}

    return(
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: primaryColor,
                padding: '5px 30px',
                height: '55px',
                width: '100vw',
                justifyContent: 'space-between',
                alignItems: 'center'
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

            {
                gameCode && location?.pathname === '/game' &&
                    <p
                        style={{
                            color: 'white',
                            margin: 0
                        }}
                    >
                        {gameCode}
                    </p>
            }
        </div>
    )
};
