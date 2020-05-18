const { Game } = require('../models');

module.exports = async ({ gameCode }) => {
    try{
        const game = await Game.findOne({ 'gameCode': gameCode }).exec()

        if(game){
            game.active = true

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