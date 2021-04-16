const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const sassMiddleware = require('node-sass-middleware');

// const conn = require('./models/games2018');
const PreseasonGame = require('./models/preseasonGame');
const PostseasonGame = require('./models/postseasonGame');

const dateFormatters = require('./utils/dates');

// const gameSchema = require('./schemas/game');

const model2018Games = require('./connections/games2018');
const model2018Preseason = require('./connections/preseason2018');
const model2018Postseason = require('./connections/postseason2018');

const model2019Games = require('./connections/games2019');


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
// 2018 Games DB
// const dbURI = 'mongodb+srv://ptfcdb_1:juN1perfA1ry@rctid.dwjjb.mongodb.net/games-2018?retryWrites=true&w=majority';
// 2019 Games DB
// const dbURI = 'mongodb+srv://ptfcdb_1:juN1perfA1ry@rctid.dwjjb.mongodb.net/games-2019?retryWrites=true&w=majority';
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then((result) => {
//         app.listen(PORT, () => { console.log(`Server started on port ${PORT}`); });
//         console.log('Connected to Database');
//     })
//     .catch((error) => { console.log(`Error connecting to Database: ${error.msg}`)});





// const conn1 = mongoose.createConnection('mongodb+srv://ptfcdb_1:juN1perfA1ry@rctid.dwjjb.mongodb.net/games-2018?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
// const conn2 = mongoose.createConnection('mongodb+srv://ptfcdb_1:juN1perfA1ry@rctid.dwjjb.mongodb.net/games-2019?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
// const SuperSchema = mongoose.Schema({});
// const superModel1 = conn1.model('Games', gameSchema);
// const superModel2 = conn2.model('Games', gameSchema);
model2018Games.find({})
    .then((games) => {
        console.log(games[0].date);
    })
    .catch((error) =>  {
        console.log(error);
});
model2018Preseason.find({})
    .then((games) => {
        console.log(games[0].date);
    })
    .catch((error) =>  {
        console.log(error);
});
model2019Games.find({})
    .then((games) => {
        console.log(games[0].date);
    })
    .catch((error) =>  {
        console.log(error);
});





app.listen(PORT, () => { console.log(`Server started on port ${PORT}`); });


// ROUTING

// Home
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// 2018
// Regular Season
app.get('/games/2018/regularseason', (req, res) => {
    model2018Games.find().sort({ date: 1 })
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
    model2018Games.findById(id)
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
    model2018Preseason.find().sort({ date: 1 })
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
    model2018Preseason.findById(id)
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
    model2018Postseason.find().sort({ date: 1 })
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
    model2018Postseason.findById(id)
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



// DB SEEDING
// Route to add Preseason Games
// app.get('/games/add-preseason-game', (req, res) => {
//     const preseasonGame = new PreseasonGame({
//         "date": "2019-03-31T03:30:00+00:00",
//         "dateLocal": "2019-03-30T20:30:00-07:00",
//         "homeTeam": "Portland Thorns FC",
//         "awayTeam": "Reign FC",
//         "thornsWinLossDraw": "Draw",
//         "finalScore": "0-0",
//         "goals": null,
//         "infractions": null,
//         "stadium": "Merlo Field",
//         "attendance": 4100,
//         "referee": "",
//         "notes": ""
//     });

//     preseasonGame.save()
//     .then((result) => {
//         res.send(result);
//     })
//     .catch((error) => {
//         console.log(error);
//     });
// });

// Route to add Postseason Games
// app.get('/games/add-postseason-game', (req, res) => {
//     const postseasonGame = new PostseasonGame({
//         "date": "2019-10-20T20:30:00+00:00",
//         "dateLocal": "2019-10-20T13:30:00-07:00",
//         "homeTeam": "Chicago Red Stars",
//         "awayTeam": "Portland Thorns FC",
//         "thornsWinLossDraw": "Loss",
//         "finalScore": "1-0",
//         "goals": [
//             {
//                 "team": "Chicago Red Stars",
//                 "player": "Sam Kerr",
//                 "minute": "8'",
//                 "assistedBy": "",
//                 "pk": false,
//                 "ownGoal": false
//             }
//         ],
//         "infractions": [
//             {
//                 "team": "Portland Thorns FC",
//                 "player": "Elizabeth Ball",
//                 "minute": "45+1'",
//                 "booked": "Yellow Card"
//             }
//         ],
//         "stadium": "SeatGeek Stadium",
//         "attendance": 9218,
//         "referee": "",
//         "notes": ""
//     });

//     postseasonGame.save()
//     .then((result) => {
//         res.send(result);
//     })
//     .catch((error) => {
//         console.log(error);
//     });
// });

// Route to add Regular Season Games
// app.get('/games/add-game', (req, res) => {
//     const game = new Game({
//         "date": "2019-10-13T03:30:00+00:00",
//         "dateLocal": "2019-10-12T20:30:00-07:00",
//         "homeTeam": "Portland Thorns FC",
//         "awayTeam": "Washington Spirit",
//         "thornsWinLossDraw": "Draw",
//         "finalScore": "0-0",
//         "goals": null,
//         "infractions": null,
//         "stadium": "Providence Park",
//         "attendance": 24521,
//         "referee": "",
//         "notes": ""
//     });

//     game.save()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// });



// Handle 404s
app.use((req, res) => {
    res.status(404).render('ohnooo', { title: 'Oh nooo!' });
});
