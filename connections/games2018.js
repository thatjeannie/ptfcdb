const mongoose = require('mongoose');
const gameSchema = require('../schemas/game');
const dbRoot = require('./dbRoot');

const dbURI2018 = `${dbRoot}/games-2018?retryWrites=true&w=majority`;

// 2018 Games DB
const conn2018Games = mongoose.createConnection(dbURI2018, { useNewUrlParser: true, useUnifiedTopology: true });

// Games model
const model2018Games = conn2018Games.model('Game', gameSchema);

module.exports = model2018Games;
