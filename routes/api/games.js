const express = require('express');
const router = express.Router();

app.set('view engine', 'ejs');

// Get routes
router.get('/games', (req, res) => {
    res.render('games');
});
