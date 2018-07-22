// const Cache = require('./redis');
const jwt = require('jsonwebtoken');
const config = require('./../../config');

class Controller {
    constructor(version) {
        this.validator = require('./../validators/v1');
        this.middlewares = require('../middlewares/v1');
        this.CONSTANTS = require('./../constants');
        this.Errors = require('./../utils/errors');
        this.config = require('./../../config');
        this.version = version;
    }
}

module.exports = Controller;
