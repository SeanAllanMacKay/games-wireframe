import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";

import { name } from '@config/constants'

import { GameProvider } from '@contexts/GameContext'

import cookie, { set as setCookie } from '@hooks/useCookie'
import useScreenSize from '@hooks/useScreenSize'

import { socket, emit } from '@reducers/sockets'

import { Header } from '@components/Header'

import Landing from '@pages/Landing'
import StartGame from '@pages/StartGame'
import JoinGame from '@pages/JoinGame'
import WaitingRoom from '@pages/WaitingRoom'

export default () => {
  const history = useHistory()
  const [screenSize] = useScreenSize();
  const [game, setGame] = useState(null)
  const [player, setPlayer] = useState(null)

  useEffect(() => {
    document.title = name
  }, [])

  useEffect(() => {
    if(game === null && cookie !== null){
      emit('join-game', cookie)
    }
  }, [game])

  socket
    .on('update-cookie', newCookie => {
      if(cookie !== newCookie){
        setCookie(newCookie)

        if(newCookie){
          const { name, playerId } = newCookie
          setPlayer({ name, playerId })
        }
      }

      if(!cookie){
        setGame(null)
        setPlayer(null)
      }
    })
    .on('update-game', newGame => {
      if(game !== newGame){
        setGame(newGame)
      }

      if(newGame && !newGame.active){
        history.push('/waiting-room')
      }
    })

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100vw',
          height: '100vh',
        }}
      >
        <GameProvider
          value={{ game, player }}
        >
          <Header />
          <Switch>
            <div
              style={{
                height: 'calc(100vh - 55px)',
                width: '100vw',
                overflow: 'auto'
              }}
            >
              <Route
                exact
                path={"/"}
                render={() =>
                  <Landing />
                }
              />

              <Route
                exact
                path={"/start-game"}
                render={() =>
                  <StartGame />
                }
              />

              <Route
                exact
                path={"/join-game"}
                render={() =>
                  <JoinGame />
                }
              />

              <Route
                exact
                path={"/waiting-room"}
                render={() =>
                  <WaitingRoom />
                }
              />
            </div>
          </Switch>
        </GameProvider>
      </div>
    </>
  );
};
