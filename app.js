const express = require('express');
const path = require('path');
const sassMiddleware = require('node-sass-middleware');
const mongoose = require('mongoose');

// For passing a current date (UTC) object to views dealing with the current season
// Thusly, in a res.render() method:
// theNowUTC: dateFormatters.theNow
const dateFormatters = require('./utils/dates');

const model2018Games = require('./connections/games2018');
const model2018Preseason = require('./connections/preseason2018');
const model2018Postseason = require('./connections/postseason2018');
const model2019Games = require('./connections/games2019');
const model2019Preseason = require('./connections/preseason2019');
const model2019Postseason = require('./connections/postseason2019');
const model2020Games = require('./connections/games2020');
const model2021Preseason = require('./connections/preseason2021');



// LOAD ENV VARIABLES
if (process.env.NODE_ENV !== 'production') { require('dotenv').config(); }



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

// Set Current Season DB URI and connect to it
const dbURICurrentSeason = `${process.env.DATABASE_URL}/games-2021?retryWrites=true&w=majority`;
const connCurrentSeason = mongoose.createConnection(dbURICurrentSeason, { useNewUrlParser: true, useUnifiedTopology: true });

// Set Public directory
app.use(express.static('public'));

// Start the app
app.listen(PORT, () => { console.log(`Server started on port ${PORT}`); });

// Set Current Season Game Schema and Model
const currentSeasonGameSchema = require('./schemas/preseasonGame');
const CurrentSeasonGame = connCurrentSeason.model('PreseasonGames', currentSeasonGameSchema);



// ROUTING
// Home
app.get('/', (req, res) => {
    CurrentSeasonGame.findOne().where('date').gte(dateFormatters.theNow)
        .then((result) => {
            res.render('index', {
                game: result,
                title: 'PTFC DB - Next Thorns Game',
                ogTitle: '<meta property="og:title" content="PTFC DB - Next Thorns Game">',
                ogType: '<meta property="og:type" content="website">',
                ogURL: '<meta property="og:url" content="https://ptfcdb.com">',
                ogImage: '<meta property="og:image" content="https://ptfcdb.com/images/ptfcdb.png">',
                seasonMeta: 'Regular Season'
            });
        })
        .catch((error) =>  {
            console.log(error);
        });
});

// Regular Season
app.get('/games/2018/regularseason', (req, res) => {
    model2018Games.find().sort({ date: 1 })
        .then((result) => {
            res.render('games-2018', {
                games: result,
                title: 'PTFC DB - All 2018 Regular Season Games',
                ogTitle: '<meta property="og:title" content="PTFC DB - All 2018 Regular Season Games">',
                ogType: '<meta property="og:type" content="website">',
                ogURL: '<meta property="og:url" content="https://ptfcdb.com/games/2018/regularseason">',
                ogImage: '<meta property="og:image" content="https://ptfcdb.com/images/ptfcdb.png">',
                seasonMeta: 'Regular Season'
            });
        })
        .catch((error) =>  {
            console.log(error);
        });
});

app.get('/games/2019/regularseason', (req, res) => {
    model2019Games.find().sort({ date: 1 })
        .then((result) => {
            res.render('games-2019', {
                games: result,
                title: 'PTFC DB - All 2019 Regular Season Games',
                ogTitle: '<meta property="og:title" content="PTFC DB - All 2018 Regular Season Games">',
                ogType: '<meta property="og:type" content="website">',
                ogURL: '<meta property="og:url" content="https://ptfcdb.com/games/2019/regularseason">',
                ogImage: '<meta property="og:image" content="https://ptfcdb.com/images/ptfcdb.png">',
                seasonMeta: 'Regular Season'
            });
        })
        .catch((error) =>  {
            console.log(error);
        });
});

app.get('/games/2020/regularseason', (req, res) => {
    model2020Games.find().sort({ date: 1 })
        .then((result) => {
            res.render('games-2020', {
                games: result,
                title: 'PTFC DB - All 2020 Regular Season Games',
                ogTitle: '<meta property="og:title" content="PTFC DB - All 2020 Regular Season Games">',
                ogType: '<meta property="og:type" content="website">',
                ogURL: '<meta property="og:url" content="https://ptfcdb.com/games/2020/regularseason">',
                ogImage: '<meta property="og:image" content="https://ptfcdb.com/images/ptfcdb.png">',
                seasonMeta: 'Regular Season'
            });
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
                title: 'PTFC DB - 2018 Regular Season Game Details',
                ogTitle: '<meta property="og:title" content="PTFC DB - 2018 Regular Season Game Details">',
                ogType: '<meta property="og:type" content="website">',
                ogURL: `<meta property="og:url" content="https://ptfcdb.com/games/2018/regularseason/${result.id}">`,
                ogImage: '<meta property="og:image" content="https://ptfcdb.com/images/ptfcdb.png">'
            });
        })
        .catch((error) =>  {
            console.log(error);
        });
});

app.get('/games/2019/regularseason/:id', (req, res) => {
    const id = req.params.id;
    model2019Games.findById(id)
        .then((result) => {
            res.render('game-details', {
                game: result,
                title: 'PTFC DB - 2019 Regular Season Game Details',
                ogTitle: '<meta property="og:title" content="PTFC DB - 2019 Regular Season Game Details">',
                ogType: '<meta property="og:type" content="website">',
                ogURL: `<meta property="og:url" content="https://ptfcdb.com/games/2019/regularseason/${result.id}">`,
                ogImage: '<meta property="og:image" content="https://ptfcdb.com/images/ptfcdb.png">'
            });
        })
        .catch((error) =>  {
            console.log(error);
        });
});

app.get('/games/2020/regularseason/:id', (req, res) => {
    const id = req.params.id;
    model2020Games.findById(id)
        .then((result) => {
            res.render('game-details', {
                game: result,
                title: 'PTFC DB - 2020 Regular Season Game Details',
                ogTitle: '<meta property="og:title" content="PTFC DB - 2020 Regular Season Game Details">',
                ogType: '<meta property="og:type" content="website">',
                ogURL: `<meta property="og:url" content="https://ptfcdb.com/games/2020/regularseason/${result.id}">`,
                ogImage: '<meta property="og:image" content="https://ptfcdb.com/images/ptfcdb.png">'
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
            res.render('games-2018', {
                games: result,
                title: 'PTFC DB - 2018 Preseason Games',
                ogTitle: '<meta property="og:title" content="PTFC DB - 2018 Preseason Games">',
                ogType: '<meta property="og:type" content="website">',
                ogURL: '<meta property="og:url" content="https://ptfcdb.com/games/2018/preseason">',
                ogImage: '<meta property="og:image" content="https://ptfcdb.com/images/ptfcdb.png">',
                seasonMeta: 'Preseason'
            });
        })
        .catch((error) =>  {
            console.log(error);
        });
});

app.get('/games/2019/preseason', (req, res) => {
    model2019Preseason.find().sort({ date: 1 })
        .then((result) => {
            res.render('games-2019', {
                games: result,
                title: 'PTFC DB - 2019 Preseason Games',
                ogTitle: '<meta property="og:title" content="PTFC DB - 2019 Preseason Games">',
                ogType: '<meta property="og:type" content="website">',
                ogURL: '<meta property="og:url" content="https://ptfcdb.com/games/2019/preseason">',
                ogImage: '<meta property="og:image" content="https://ptfcdb.com/images/ptfcdb.png">',
                seasonMeta: 'Preseason'
            });
        })
        .catch((error) =>  {
            console.log(error);
        });
});

app.get('/games/2021/preseason', (req, res) => {
    model2021Preseason.find().sort({ date: 1 })
        .then((result) => {
            res.render('games-2021', {
                games: result,
                title: 'PTFC DB - 2021 Preseason Games',
                ogTitle: '<meta property="og:title" content="PTFC DB - 2021 Preseason Games">',
                ogType: '<meta property="og:type" content="website">',
                ogURL: '<meta property="og:url" content="https://ptfcdb.com/games/2021/preseason">',
                ogImage: '<meta property="og:image" content="https://ptfcdb.com/images/ptfcdb.png">',
                seasonMeta: 'Preseason',
                theNowUTC: dateFormatters.theNow
            });
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
                title: 'PTFC DB - 2018 Preseason Game Details',
                ogTitle: '<meta property="og:title" content="PTFC DB - 2018 Preseason Game Details">',
                ogType: '<meta property="og:type" content="website">',
                ogURL: `<meta property="og:url" content="https://ptfcdb.com/games/2018/preseason/${result.id}">`,
                ogImage: '<meta property="og:image" content="https://ptfcdb.com/images/ptfcdb.png">'
            });
        })
        .catch((error) =>  {
            console.log(error);
        });
});

app.get('/games/2019/preseason/:id', (req, res) => {
    const id = req.params.id;
    model2019Preseason.findById(id)
        .then((result) => {
            res.render('game-details', {
                game: result,
                title: 'PTFC DB - 2019 Preseason Game Details',
                ogTitle: '<meta property="og:title" content="PTFC DB - 2019 Preseason Game Details">',
                ogType: '<meta property="og:type" content="website">',
                ogURL: `<meta property="og:url" content="https://ptfcdb.com/games/2019/preseason/${result.id}">`,
                ogImage: '<meta property="og:image" content="https://ptfcdb.com/images/ptfcdb.png">'
            });
        })
        .catch((error) =>  {
            console.log(error);
        });
});

app.get('/games/2021/preseason/:id', (req, res) => {
    const id = req.params.id;
    model2021Preseason.findById(id)
        .then((result) => {
            res.render('game-details', {
                game: result,
                title: 'PTFC DB - 2021 Preseason Game Details',
                ogTitle: '<meta property="og:title" content="PTFC DB - 2021 Preseason Game Details">',
                ogType: '<meta property="og:type" content="website">',
                ogURL: `<meta property="og:url" content="https://ptfcdb.com/games/2021/preseason/${result.id}">`,
                ogImage: '<meta property="og:image" content="https://ptfcdb.com/images/ptfcdb.png">',
                theNowUTC: dateFormatters.theNow
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
            res.render('games-2018', {
                games: result,
                title: 'PTFC DB - 2018 Postseason Games',
                ogTitle: '<meta property="og:title" content="PTFC DB - 2018 Postseason Games">',
                ogType: '<meta property="og:type" content="website">',
                ogURL: '<meta property="og:url" content="https://ptfcdb.com/games/2018/postseason">',
                ogImage: '<meta property="og:image" content="https://ptfcdb.com/images/ptfcdb.png">',
                seasonMeta: 'Postseason'
            });
        })
        .catch((error) =>  {
            console.log(error);
        });
});

app.get('/games/2019/postseason', (req, res) => {
    model2019Postseason.find().sort({ date: 1 })
        .then((result) => {
            res.render('games-2019', {
                games: result,
                title: 'PTFC DB - 2019 Postseason Games',
                ogTitle: '<meta property="og:title" content="PTFC DB - 2019 Postseason Games">',
                ogType: '<meta property="og:type" content="website">',
                ogURL: '<meta property="og:url" content="https://ptfcdb.com/games/2019/postseason">',
                ogImage: '<meta property="og:image" content="https://ptfcdb.com/images/ptfcdb.png">',
                seasonMeta: 'Postseason'
            });
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
                title: 'PTFC DB - 2018 Postseason Game Details',
                ogTitle: '<meta property="og:title" content="PTFC DB - 2018 Postseason Game Details">',
                ogType: '<meta property="og:type" content="website">',
                ogURL: `<meta property="og:url" content="https://ptfcdb.com/games/2018/postseason/${result.id}">`,
                ogImage: '<meta property="og:image" content="https://ptfcdb.com/images/ptfcdb.png">'
            });
        })
        .catch((error) =>  {
            console.log(error);
        });
});

app.get('/games/2019/postseason/:id', (req, res) => {
    const id = req.params.id;
    model2019Postseason.findById(id)
        .then((result) => {
            res.render('game-details', {
                game: result,
                title: 'PTFC DB - 2019 Postseason Game Details',
                ogTitle: '<meta property="og:title" content="PTFC DB - 2019 Postseason Game Details">',
                ogType: '<meta property="og:type" content="website">',
                ogURL: `<meta property="og:url" content="https://ptfcdb.com/games/2019/postseason/${result.id}">`,
                ogImage: '<meta property="og:image" content="https://ptfcdb.com/images/ptfcdb.png">'
            });
        })
        .catch((error) =>  {
            console.log(error);
        });
});



// DB SEEDING
// Each game type uses the same route and some constants, so uncomment/use only one at a time

// Add Preseason Games
// Uncomment connection details and route, adjust the year as needed
// const gameSchema = require('./schemas/preseasonGame');
// const dbURI2021 = `${process.env.DATABASE_URL}/games-2021?retryWrites=true&w=majority`;
// const conn2021PreseasonGames = mongoose.createConnection(dbURI2021, { useNewUrlParser: true, useUnifiedTopology: true });
// const PreseasonGame = conn2021PreseasonGames.model('PreseasonGames', gameSchema);

// app.get('/games/add-game', (req, res) => {
//     const game = new PreseasonGame({ /* insert game object here */ });

//     game.save()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// });

// Add Postseason Games
// Uncomment connection details and route and some constants, adjust the year as needed
// const gameSchema = require('./schemas/postseasonGame');
// const dbURI2020 = `${dprocess.env.DATABASE_URLbRoot}/games-2020?retryWrites=true&w=majority`;
// const conn2020PostseasonGames = mongoose.createConnection(dbURI2020, { useNewUrlParser: true, useUnifiedTopology: true });
// const PostseasonGame = conn2020PostseasonGames.model('PostseasonGames', gameSchema);

// app.get('/games/add-game', (req, res) => {
//     const game = new PostseasonGame({ /* insert game object here */ });

//     game.save()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// });

// Add Regular Season Games
// Uncomment connection details and route and some constants, adjust the year as needed
// const gameSchema = require('./schemas/game');
// const dbURI2020 = `${process.env.DATABASE_URL}/games-2020?retryWrites=true&w=majority`;
// const conn2020Games = mongoose.createConnection(dbURI2020, { useNewUrlParser: true, useUnifiedTopology: true });
// const Game = conn2020Games.model('Games', gameSchema);

// app.get('/games/add-game', (req, res) => {
//     const game = new Game({ /* insert game object here */ });

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
    res.status(404).render('ohnooo', { title: 'PTFC DB - 404' });
});
