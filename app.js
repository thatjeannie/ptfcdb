const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const sassMiddleware = require('node-sass-middleware');

const Game = require('./models/game');
const PreseasonGame = require('./models/preseasonGame');
const PostseasonGame = require('./models/postseasonGame');

const dateFormatters = require('./utils/dates');


// THE APP
const app = express();


// MIDDLEWARES

// I forget
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set('view engine', 'ejs');

// Sass config
app.use(sassMiddleware({
    src: path.join(__dirname, 'scss'),
    dest: path.join(__dirname, 'public/css'),
    debug: true,
    outputStyle: 'compressed',
    prefix: '/css',
    force: true
}));

// Set port
const PORT = process.env.PORT || 3000

// Set Public directory
app.use(express.static('public'));


// DB CONNECTION

// Connect to MongoDB first and start the server after that
const dbURI = 'mongodb+srv://ptfcdb_1:juN1perfA1ry@rctid.dwjjb.mongodb.net/games-2018?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(PORT, () => { console.log(`Server started on port ${PORT}`); });
        console.log('Connected to Database');
    })
    .catch((error) => { console.log(`Error connecting to Database: ${error.msg}`)});


// ROUTING

// Home
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// 2018
// Regular Season
app.get('/games/2018/regularseason', (req, res) => {
    Game.find().sort({ date: 1 })
        .then((result) => {
            res.render('games-2018', { games: result, title: 'All 2018 Games', seasonMeta: 'Regular Season' });
        })
        .catch((error) =>  {
            console.log(error);
        });
});

// Regular Season Single Games
app.get('/games/2018/regularseason/:id', (req, res) => {
    const id = req.params.id;
    Game.findById(id)
        .then((result) => {
            res.render('game-details', {
                game: result,
                title: 'Game Details',
                gameDateMonth: dateFormatters.monthNames[result.date.getMonth()],
                gameDateOrdinal: dateFormatters.ordinalOf(result.date.getDate())
            });
        })
        .catch((error) =>  {
            console.log(error);
        });
});

// Preseason (PreseasonGame)
app.get('/games/2018/preseason', (req, res) => {
    PreseasonGame.find().sort({ date: 1 })
        .then((result) => {
            res.render('games-2018', { games: result, title: '2018 Preseason Games', seasonMeta: 'Preseason' });
        })
        .catch((error) =>  {
            console.log(error);
        });
});

// Preseason Single Games
app.get('/games/2018/preseason/:id', (req, res) => {
    const id = req.params.id;
    PreseasonGame.findById(id)
        .then((result) => {
            res.render('game-details', {
                game: result,
                title: 'Game Details',
                gameDateMonth: dateFormatters.monthNames[result.date.getMonth()],
                gameDateOrdinal: dateFormatters.ordinalOf(result.date.getDate())
            });
        })
        .catch((error) =>  {
            console.log(error);
        });
});

// Postseason (PostseasonGame)
app.get('/games/2018/postseason', (req, res) => {
    PostseasonGame.find().sort({ date: 1 })
        .then((result) => {
            res.render('games-2018', { games: result, title: '2018 Postseason Games', seasonMeta: 'Postseason' });
        })
        .catch((error) =>  {
            console.log(error);
        });
});

// Postseason Single Games
app.get('/games/2018/postseason/:id', (req, res) => {
    const id = req.params.id;
    PostseasonGame.findById(id)
        .then((result) => {
            res.render('game-details', {
                game: result,
                title: 'Game Details',
                gameDateMonth: dateFormatters.monthNames[result.date.getMonth()],
                gameDateOrdinal: dateFormatters.ordinalOf(result.date.getDate())
            });
        })
        .catch((error) =>  {
            console.log(error);
        });
});

// Handle 404s
app.use((req, res) => {
    res.status(404).render('ohnooo', { title: 'Oh nooo!' });
});
