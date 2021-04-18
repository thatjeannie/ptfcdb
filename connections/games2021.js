const mongoose = require('mongoose');
const gameSchema = require('../schemas/game');
const dbRoot = require('./dbRoot');

const dbURI2021 = `${dbRoot}/games-2021?retryWrites=true&w=majority`;

// 2021 Games DB
const conn2021Games = mongoose.createConnection(dbURI2021, { useNewUrlParser: true, useUnifiedTopology: true });

// Games model
const model2021Games = conn2021Games.model('Games', gameSchema);

module.exports = model2021Games;
