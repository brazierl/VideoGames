// BASE SETUP
// =============================================================================

// use a configuration file
var config = require('./config');

// call the packages we need
var express = require('express'); // call express
var app = express(); // define the app
var morgan = require('morgan');

var ctrlGame = require('./controllers/game');

app.use(morgan('common'));

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get instance of Router

router.route('/games')
    .get(function (req, res) {
        ctrlGame.getGames(req, res);
    })

router.route('/games/:id')
    .get(function (req, res) {
        ctrlGame.getGame(req, res);
    })

app.use(config.app.path.api, router);

// START THE SERVER
// =============================================================================
app.listen(config.app.port);
console.log('Server listening on port ' + config.app.port);
