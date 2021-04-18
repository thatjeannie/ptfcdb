const mongoose = require('mongoose');
const preseasonGameSchema = require('../schemas/preseasonGame');
const dbRoot = require('./dbRoot');

const dbURI2019 = `${dbRoot}/games-2019?retryWrites=true&w=majority`;

// 2019 Games DB
const conn2019Games = mongoose.createConnection(dbURI2019, { useNewUrlParser: true, useUnifiedTopology: true });

// Games model
const model2019Preseason = conn2019Games.model('PreseasonGame', preseasonGameSchema);

module.exports = model2019Preseason;
