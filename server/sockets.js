const { name } = require('../src/config/constants')
const startGame = require('./api/start-game')
const joinGame = require('./api/join-game')
const leaveGame = require('./api/leave-game')
const disconnect = require('./api/disconnect')

module.exports = (http) => {
    const io = require('socket.io')(http)
    const game = io.of(`/${name}`);

    game.on('connection', socket => {
        socket.on('start-game', async newGame => {
            try{
                const { success, game, player, error } = await startGame({ ...newGame, socket: socket.id }) || {}

                if(success){
                    socket.emit('update-game', game)
                    socket.emit('update-cookie', { gameCode: game.gameCode, ...player })
                } else {
                    socket.emit('error', error)
                }
            }catch(error){
                socket.emit('error', error)
            }
        })
        .on('join-game', async ({ gameCode, name: playerName, points, playerId }) => {
            try{
                const { success, game, player, error, deleteCookie } = await joinGame({ gameCode, name: playerName, points, playerId, socket: socket.id })

                if(success){
                    io.of(`/${name}`).emit('update-game', game);
                    socket.emit('update-cookie', { gameCode, ...player })
                } else {
                    if(deleteCookie){
                        socket.emit('update-cookie', null)
                    }

                    socket.emit('error', error)
                }
            }catch(error){
                socket.emit('error', error)
            }
        })
        .on('leave-game', async ({ gameCode, playerId }) => {
            try{
                const { success, game, error } = await leaveGame({ gameCode, playerId, socket: socket.id })

                if(success){
                    socket.leave(`/${gameCode}`)
                    socket.emit('update-cookie', null)
                    socket.emit('update-game', null)
                    socket.to(`/${name}`).emit('update-game', game);
                } else {
                    socket.emit('error', error)
                }
            }catch(error){
                socket.emit('error', error)
            }
        })
        .on('disconnect', async () => {
            try{
                const { success, game, error } = await disconnect({ socket: socket.id })

                if(success){
                    socket.leave(game.gameCode)
                    io.of(`/${name}`).emit('update-game', game);
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