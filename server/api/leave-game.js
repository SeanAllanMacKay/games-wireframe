const { Game } = require('../models');

module.exports = async ({ gameCode, playerId, socket }) => {
    try{
        const game = await Game.findOne({ gameCode }).exec()

        game.sockets.splice(game.sockets.indexOf(socket), 1)

        const player = game.players.find(player => player.playerId === playerId)

        game.players.splice(game.players.indexOf(player), 1)

        const { _doc: { players, ...rest } } = await game.save()

        return {
            success: true,
            game: {
                ...rest,
                players: players.filter(({ active }) => active)
            }
        }
    } catch(error){
        console.log(error)
        return { success: false, error };
    }
}