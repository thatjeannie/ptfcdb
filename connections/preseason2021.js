const mongoose = require('mongoose');
const preseasonGameSchema = require('../schemas/preseasonGame');
const dbRoot = require('./dbRoot');

const dbURI2021 = `${dbRoot}/games-2021?retryWrites=true&w=majority`;

// 2021 Games DB
const conn2021Games = mongoose.createConnection(dbURI2021, { useNewUrlParser: true, useUnifiedTopology: true });

// Games model
const model2021Preseason = conn2021Games.model('PreseasonGame', preseasonGameSchema);

module.exports = model2021Preseason;
