const { Game } = require('../models');

module.exports = async ({ socket }) => {
    try{
        const game = await Game.findOne({ 'sockets': socket }).exec()

        game.sockets.splice(game.sockets.indexOf(socket), 1)

        const player = game.players.find(player => player.socket === socket)

        player.active = false;
        player.socket = null;

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