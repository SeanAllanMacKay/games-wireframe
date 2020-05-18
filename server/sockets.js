const { name } = require('../src/config/constants')
const startGame = require('./api/start-game')
const joinGame = require('./api/join-game')
const leaveGame = require('./api/leave-game')
const allIn = require('./api/all-in')
const changeTurn = require('./api/change-turn')
const disconnect = require('./api/disconnect')

module.exports = (http) => {
    const io = require('socket.io')(http)
    const game = io.of(`/${name}`);

    game.on('connection', socket => {
        socket.on('start-game', async newGame => {
            try{
                const {
                    success,
                    game,
                    player,
                    error,
                    gameCode
                } = await startGame({ ...newGame, socket: socket.id }) || {}

                if(success){
                    socket.join(`/${gameCode}`)
                    socket.emit('update-game', game)
                    socket.emit('update-cookie', { gameCode: game.gameCode, ...player })
                } else {
                    socket.emit('error', error)
                    console.log(error)
                }
            }catch(error){
                console.log(error)
                socket.emit('error', error)
            }
        })
        .on('join-game', async ({ gameCode, name: playerName, points, playerId }) => {
            try{
                if(gameCode && playerName){
                    const {
                        success,
                        game,
                        player,
                        error,
                        deleteCookie
                    } = await joinGame({
                        gameCode,
                        name: playerName, 
                        points, playerId,
                        socket: socket.id
                    })

                    if(success){
                        socket.join(`/${gameCode}`)
                        io.of(`/${name}`).to(`/${gameCode}`).emit('update-game', game);
                        socket.emit('update-cookie', { gameCode, ...player })
                    } else {
                        console.log(error)
                        if(deleteCookie){
                            socket.emit('update-cookie', null)
                        }
                    }
                }
            } catch (error) {
                console.log(error)
                socket.emit('error', error)
            }
        })
        .on('leave-game', async ({ gameCode, playerId }) => {
            try{
                const {
                    success,
                    game,
                    error
                } = await leaveGame({ gameCode, playerId, socket: socket.id })

                if(success){
                    socket.leave(`/${gameCode}`)
                    socket.emit('update-cookie', null)

                    if(game?.players?.length){
                        socket.to(`/${gameCode}`).emit('update-game', game);
                    }
                } else {
                    socket.emit('error', error)
                }
            }catch(error){
                socket.emit('error', error)
            }
        })
        .on('all-in', async ({ gameCode }) => {
            try{
                const {
                    success,
                    game,
                    error
                } = await allIn({ gameCode })

                if(success){
                    io.of(`/${name}`).to(`/${gameCode}`).emit('update-game', game);
                } else {
                    socket.emit('error', error)
                }
            } catch(error){
                socket.emit('error', error)
            }
        })
        .on('change-turn', async ({ gameCode }) => {
            try{
                const {
                    success,
                    game,
                    error
                } = await changeTurn({ gameCode })

                if(success){
                    io.of(`/${name}`).to(`/${gameCode}`).emit('update-game', game);
                } else {
                    socket.emit('error', error)
                }
            } catch(error){
                socket.emit('error', error)
            }
        })
        .on('disconnect', async () => {
            try{
                const { success, game, error } = await disconnect({ socket: socket.id })

                const { gameCode = null } = game || {}

                if(gameCode && success){
                    socket.leave(`/${gameCode}`)
                    io.of(`/${name}`).to(`/${gameCode}`).emit('update-game', game);
                } else {
                    socket.emit('error', error)
                }
            }catch(error){
                socket.emit('error', error)
            }
        })
    });

    return game;
}