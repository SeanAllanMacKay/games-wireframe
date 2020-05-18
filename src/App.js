import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";

import { name } from '@config/constants'

import { GameProvider } from '@contexts/GameContext'

import Cookies from 'universal-cookie'
import useScreenSize from '@hooks/useScreenSize'

import { socket, emit } from '@reducers/sockets'

import { Header } from '@components/Header'

import Landing from '@pages/Landing'
import StartGame from '@pages/StartGame'
import JoinGame from '@pages/JoinGame'
import WaitingRoom from '@pages/WaitingRoom'
import Game from '@pages/Game'

const initialCookies = new Cookies()

const setCookies = (newCookie) => {
  initialCookies.set(`${name}`, JSON.stringify(newCookie), { path: '/' })
}

const removeCookies = () => {
  initialCookies.remove(`${name}`, { path: '/' })
}

export default () => {
  const history = useHistory()
  const [screenSize] = useScreenSize();
  const [game, setGame] = useState(null)
  const [player, setPlayer] = useState(null)
  const [cookie, setCookie] = useState(initialCookies.get(`${name}`))

  useEffect(() => {
    document.title = name
  }, [])

  useEffect(() => {
    socket.on('update-cookie', async (newCookie) => {
      if(!newCookie){
        setGame(null)
        setCookie(null)
        removeCookies()
      } else if(cookie !== newCookie){
        setCookies(newCookie)

        if(newCookie){
          const { name, playerId } = newCookie
          setPlayer({ name, playerId })
        }
      }
    })
  }, [])

  useEffect(() => {
    if(game === null && cookie && cookie !== null){
      emit('join-game', cookie)
    }
  }, [game, cookie])

  useEffect(() => {
    socket.on('update-game', newGame => {
      setGame(newGame)

      if(newGame){
        if(!newGame.active){
          history.push('/waiting-room')
        } else {
          history.push('/game')
        }
      }
    })
  }, [])

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

              <Route
                exact
                path={"/game"}
                render={() =>
                  <Game />
                }
              />
            </div>
          </Switch>
        </GameProvider>
      </div>
    </>
  );
};
