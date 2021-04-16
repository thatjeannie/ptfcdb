const mongoose = require('mongoose');
const preseasonGameSchema = require('../schemas/preseasonGame');

const dbURI2018 = 'mongodb+srv://ptfcdb_1:juN1perfA1ry@rctid.dwjjb.mongodb.net/games-2018?retryWrites=true&w=majority'

// 2018 Games DB
const conn2018Games = mongoose.createConnection(dbURI2018, { useNewUrlParser: true, useUnifiedTopology: true });

// Games model
const model2018Preseason = conn2018Games.model('PreseasonGame', preseasonGameSchema);

module.exports = model2018Preseason;
