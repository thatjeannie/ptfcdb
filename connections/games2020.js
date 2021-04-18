const mongoose = require('mongoose');
const gameSchema = require('../schemas/game');

// LOAD ENV VARIABLES
if (process.env.NODE_ENV !== 'production') { require('dotenv').config(); }

const dbURI2020 = `${process.env.DATABASE_URL}/games-2020?retryWrites=true&w=majority`;

// 2020 Games DB
const conn2020Games = mongoose.createConnection(dbURI2020, { useNewUrlParser: true, useUnifiedTopology: true });

// Games model
const model2020Games = conn2020Games.model('Games', gameSchema);

module.exports = model2020Games;
