const mongoose = require('mongoose');
const posteasonGameSchema = require('../schemas/postseasonGame');

// LOAD ENV VARIABLES
if (process.env.NODE_ENV !== 'production') { require('dotenv').config(); }

const dbURI2018 = `${process.env.DATABASE_URL}/games-2018?retryWrites=true&w=majority`;

// 2018 Games DB
const conn2018Games = mongoose.createConnection(dbURI2018, { useNewUrlParser: true, useUnifiedTopology: true });

// Games model
const model2018Postseason = conn2018Games.model('PostseasonGame', posteasonGameSchema);

module.exports = model2018Postseason;
