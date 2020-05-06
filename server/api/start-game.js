const { Game } = require('../models');

module.exports = async (newGameValues) => {
    const {
        name,
        socket
    } = newGameValues

    const gameCode = (() => {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (var i = 0; i < 6; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    })()

    let player = {
        playerId: 0,
        name,
        points: 0,
        active: true
    }

    let game = {
        gameCode,
        players: [{...player, socket, active: true}],
        sockets: [socket],
        turn: 0,
        active: false,
    }

    try {
        const newGame = new Game(game)
        const response = await newGame.save()
        return { success: true, game: response, player }
    } catch(error){
        return { success: false, error };
    }
}