const mongoose = require("mongoose");

let Schema = mongoose.Schema

const gameSchema = new Schema({
    gameCode: String,
    players: [{
        playerId: Number,
        name: String,
        points: Number,
        socket: String,
        active: Boolean
    }],
    sockets: [String],
    turn: Number,
    active: Boolean,
}, { collection: 'games' })

mongoose.model('Game', gameSchema)

module.exports = mongoose.model('Game');