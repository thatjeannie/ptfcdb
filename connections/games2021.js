const mongoose = require('mongoose');
const gameSchema = require('../schemas/game');

// LOAD ENV VARIABLES
if (process.env.NODE_ENV !== 'production') { require('dotenv').config(); }

const dbURI2021 = `${process.env.DATABASE_URL}/games-2021?retryWrites=true&w=majority`;

// 2021 Games DB
const conn2021Games = mongoose.createConnection(dbURI2021, { useNewUrlParser: true, useUnifiedTopology: true });

// Games model
const model2021Games = conn2021Games.model('Games', gameSchema);

module.exports = model2021Games;
