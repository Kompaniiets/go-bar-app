const winston = require('winston');
const config = require('winston/lib/winston/config');

module.exports = [
    new (winston.transports.Console)({
        timestamp() {
            return new Date().toISOString();
        },
        colorize: true,
        formatter(options) {
            const message = (undefined !== options.message) ? options.message :
                options.meta.message;
            const stack = options.meta && options.meta.stack ? options.meta.stack : '';
            let meta = '';
            if (options.meta && Object.keys(options.meta).length) {
                delete options.meta.stack;
                meta = JSON.stringify(options.meta);
            }

            return `[${config.colorize(options.level, options.timestamp())}] - ${
                config.colorize(options.level, options.level.toUpperCase())}: ${
                message
                } ${
                meta
                } ${
                stack}`;
        },
    }),
];
