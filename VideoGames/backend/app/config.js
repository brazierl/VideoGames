var config = {};
config.igdb = {};
config.app = {};
config.igdb.path = {};
config.app.path = {};

config.prod = true;

if(config.prod){
    // https://videogames-brazierl.c9users.io/
    config.app.protocol = 'https';
    config.app.host = 'videogames-brazierl.c9users.io'; 
    config.app.port = 3000;
}
else{
    config.app.protocol = 'http';
    config.app.host = 'localhost';
    config.app.port = 8080;
}

config.app.url = config.app.protocol + '://' + config.app.host + ':' + config.app.port;

config.igdb.protocol = 'https';
config.igdb.host = 'api-2445582011268.apicast.io';
config.igdb.url = config.igdb.protocol + '://' + config.igdb.host + ':' + config.igdb.port;
config.igdb.apiKey = 'b1fee22b7268b65a88fffc8fcbcaf179';

config.igdb.path.games = '/games';

config.app.path.api = '/api';
config.app.path.games = '/games';


module.exports = config;