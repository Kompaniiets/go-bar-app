const winston = require('winston');
const transports = require('./transports');

const logger = winston.createLogger({
    transports,
    exitOnError: false,
});

module.exports = logger;
