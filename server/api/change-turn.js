const { Game } = require('../models');

module.exports = async ({ gameCode }) => {
    try{
        const game = await Game.findOne({ 'gameCode': gameCode }).exec()

        if(game){
            const activePlayers = game.players.filter(({ active }) => active)

            const players = activePlayers.sort(({ playerId: playerIdA }, { playerId: playerIdB }) => playerIdA > playerIdB ? 1 : playerIdA < playerIdB ? -1 : 0).map(({ playerId }) => playerId)

            const playerLocation = players.indexOf(game.turn)

            if(playerLocation === (players.length - 1)){
                game.turn = activePlayers[0].playerId
            } else {
                game.turn = activePlayers[playerLocation + 1].playerId
            }

            const { _doc: newGame } = await game.save()
            return {
                success: true,
                game: newGame
            }
        } else {
            return { success: false, error: "Game not found" };
        }
        
    } catch(error){
        return { success: false, error };
    }
}