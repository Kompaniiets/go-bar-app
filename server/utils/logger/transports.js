const { format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;
const _ = require('lodash');

const excludeItems = [
    'timestamp',
    'level',
    'message'
];

const myFormat = printf(info => {
    const otherInfo = _.omit(info, excludeItems);
    return `[${info.timestamp}] [${info.level}]: ${info.message || ''} ${Object.keys(otherInfo).length ? JSON.stringify(otherInfo) : ''}`;
});

module.exports = [
    new transports.Console({
        format: combine(
            format(info => {
                info.level = info.level.toUpperCase();
                return info;
            })(),
            timestamp(),
            colorize({
                all: true
            }),
            myFormat)
    })
];
