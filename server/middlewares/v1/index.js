const fs = require('fs');

const Middlewares = {};

fs
    .readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
    .forEach((file) => {
        Middlewares[file.split('.')[0]] = require(`./${file}`);
    });


module.exports = Middlewares;
