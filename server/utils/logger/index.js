const { createLogger } = require('winston');
const transports = require('./transports');

const logger = createLogger({
    transports,
    exitOnError: false,
});

module.exports = logger;
