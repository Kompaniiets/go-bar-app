const db = require('./db');
const redis = require('./redis');
const socials = require('./socials');

const defaults = {
    server: {
        port: parseInt(process.env.PORT) || 4500,
        host: process.env.HOST || 'localhost',
    },
    jwtKey: 'go-bar-string',
    jwtLifeTime: 1000 * 60 * 60 * 24,
    jwtRefreshLifeTime: 1000 * 60 * 60 * 48,
    db,
    redis,
    socials
};

defaults.server.baseUrl = ['http://', defaults.server.host, ':', defaults.server.port].join('');

module.exports = defaults;
