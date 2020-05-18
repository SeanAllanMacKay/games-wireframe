const { Game } = require('../models');

module.exports = async ({ gameCode, name, points = 0, playerId, socket }) => {
    try{
        const game = await Game.findOne({ gameCode }).exec()

        let player;

        if(game){
             // If adding player to game
            if(!game.players.find(({ playerId: gamePlayerId }) => playerId === gamePlayerId)){
                const newPlayerId = Math.max(...game.players.map(({ playerId: id }) => id)) + 1

                player = {
                    playerId: newPlayerId,
                    name,
                    points,
                    active: true
                }

                game.players.push({ ...player, socket })

                game.sockets.push(socket)

                if(game.turn === null){
                    game.turn = newPlayerId
                }
            // If re-instating player via cookie
            } else {
                player = game.players.find(player => player.playerId === playerId)

                player.active = true;
                player.socket = socket;

                if(!game.sockets.find((gameSocket) => gameSocket === socket)){
                    game.sockets.push(socket)
                }

                if(game.turn === null){
                    game.turn = playerId
                }

                player = player._doc
            }

            const { _doc: { players, ...rest } } = await game.save()

            return {
                success: true,
                game: {
                    ...rest,
                    players: players.filter(({ active }) => active)
                },
                player
            }
        } else {
            return { success: false, error: "Game not found" };
        }
    } catch(error){
        return { success: false, error, deleteCookie: true };
    }
}