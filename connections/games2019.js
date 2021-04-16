const mongoose = require('mongoose');
const gameSchema = require('../schemas/game');

const dbURI2019 = 'mongodb+srv://ptfcdb_1:juN1perfA1ry@rctid.dwjjb.mongodb.net/games-2019?retryWrites=true&w=majority'

// 2019 Games DB
const conn2019Games = mongoose.createConnection(dbURI2019, { useNewUrlParser: true, useUnifiedTopology: true });

// Games model
const model2019Games = conn2019Games.model('Games', gameSchema);

module.exports = model2019Games;
