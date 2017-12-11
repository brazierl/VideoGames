var config = require('../config');
var Game = require("../models/game.js");
var querystring = require('querystring');
var protocol = require(config.igdb.protocol);

// retreive the JSON when communicate with remote API
function getJSON(options, callback) {
    const reqApi = protocol.request(options, (resApi) => {
        var rawData = '';
        resApi.on('data', (chunk) => {
            rawData += chunk;
        });
        resApi.on('end', () => { callback(rawData) });
    });
    reqApi.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
        res.status(500).json({ message: 'An internal error occured when retrieving data.' });
    });
    reqApi.end();
}

module.exports.getGames = function (req, res) {
    var search = req.query.search;
    var path;
    if (search) {
        path = config.igdb.path.games + "/?" + querystring.stringify({ 'fields': '*', 'search': search });
    } else {
        path = config.igdb.path.games + "/?" + querystring.stringify({ 'fields': '*' });
    }
    const options = {
        hostname: config.igdb.host,
        path: path,
        method: 'GET',
        headers: {
            'user-key': config.igdb.apiKey,
            'Accept': 'application/json'
        }
    };
    getJSON(options, function (rawData) {
        const data = JSON.parse(rawData);
        var listGame = [];
        for (var i = 0; i < data.length; i++) {
            var gameData = data[i];
            listGame.push(createGame(gameData));
        }
        var json = listGame;
        res.json(json);
    });
}

module.exports.getGame = function (req, res) {
    var gameId = req.params.id;
    if (gameId) {
        const options = {
            hostname: config.igdb.host,
            path: config.igdb.path.games + "/" + gameId + "?" + querystring.stringify({ 'fields': '*' }),
            method: 'GET',
            headers: {
                'user-key': config.igdb.apiKey,
                'Accept': 'application/json'
            }
        };
        getJSON(options, function (rawData) {
            const data = JSON.parse(rawData);
            var json = { game: createGame(data) };
            res.json(json);
        });
    }
    else {
        res.status(400).json({ message: "Missing parameter 'id' in query." })
    }
}

function createGame(gameData) {
    var game = Object.assign({}, Game);
    game.id = gameData.id;
    game.name = gameData.name;
    game.slug = gameData.slug;
    game.url = gameData.url;
    if (gameData.cover)
        game.imageUrl = gameData.cover.url;
    game.createdAt = gameData.created_at;
    game.updatedAt = gameData.updated_at;
    game.releaseDate = gameData.first_release_date;
    game.rating = gameData.total_rating;
    if (gameData.summary) {
        game.summary = gameData.summary;
        game.shortSummary = (('' + gameData.summary).length > 150 ? ('' + gameData.summary).substr(0, 150) + "[...]" : "" + gameData.summary);
    }
    game.themes = gameData.themes;
    return game;
}