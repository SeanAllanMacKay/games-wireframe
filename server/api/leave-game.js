const { Game } = require('../models');

module.exports = async ({ gameCode, playerId, socket }) => {
    try{
        const game = await Game.findOne({ gameCode }).exec()

        if(game){
            game.sockets = game.sockets.filter(socketId => socketId != socket)

            const player = game.players.find(player => player.playerId === playerId)

            game.players.splice(game.players.indexOf(player), 1)

            if(game?.players?.length){
                const { _doc: { players, ...rest } } = await game.save()

                return {
                    success: true,
                    game: {
                        ...rest,
                        players: players.filter(({ active }) => active)
                    }
                }
            } else {
                await game.deleteOne()

                return {
                    success: true
                }
            }
        } else {
            return {
                success: false,
                error: 'Game not found'
            }
        }
    } catch(error){
        return { success: false, error };
    }
}