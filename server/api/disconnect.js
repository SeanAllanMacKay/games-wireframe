const { Game } = require('../models');

module.exports = async ({ socket }) => {
    try{
        const game = await Game.findOne({ 'sockets': socket }).exec()

        if(game){
            game.sockets = game.sockets.filter(socketId => socketId != socket)

            const player = game.players.find(player => player.socket === socket)

            player.active = false;
            player.socket = null;

            const activePlayers = game.players.filter(({ active }) => active)

            if(activePlayers.length === 0){
                game.turn = null
            } else if(activePlayers.length === 1){
                game.turn = activePlayers[0].playerId
            } else if(game.turn === player.playerId && activePlayers.length > 1){
                const players = activePlayers.sort(({ playerId: playerIdA }, { playerId: playerIdB }) => playerIdA > playerIdB ? 1 : playerIdA < playerIdB ? -1 : 0)

                const playerLocation = players.indexOf(player.playerId)

                if(playerLocation === (players.length - 1)){
                    game.turn = activePlayers[0].playerId || null
                } else {
                    game.turn = activePlayers[playerLocation + 1].playerId
                }
            }

            const { _doc: { players, ...rest } } = await game.save()
            return {
                success: true,
                game: {
                    ...rest,
                    players: players.filter(({ active }) => active),
                }
            }
        } else {
            return { success: false, error: "Game not found" };
        }
        
    } catch(error){
        return { success: false, error };
    }
}