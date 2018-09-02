// const Cache = require('./redis');
const CONSTANTS = require('./../constants');
const jwt = require('jsonwebtoken');
const config = require('./../../config');
const uuidv5 = require('uuid/v4');

class Controller {
    constructor(version) {
        this.validator = require('./../validators/v1');
        this.middlewares = require('../middlewares/v1');
        this.CONSTANTS = require('./../constants');
        this.Errors = require('./../utils/errors');
        this.config = require('./../../config');
        this.version = version;
    }

    /**
     * Create refresh token
     * @param params
     * @returns {*}
     */
    createRefreshToken(params) {
        return jwt.sign({
            exp: params.createTime + config.jwtRefreshLifeTime,
            data: params,
        }, config.jwtKey);
    }

    /**
     * Create user access token
     * @param client
     * @returns {Promise}
     */
    createUserToken(client) {
        const tokenParams = {};
        tokenParams.createTime = Date.now();
        tokenParams.id = client.id;
        tokenParams.key = uuidv5();

        const user = client;

        user.token = CONSTANTS.AUTHORIZATION.STRATEGY + jwt.sign({
            exp: tokenParams.createTime + config.jwtLifeTime,
            data: tokenParams,
        }, config.jwtKey);
        user.refreshToken = this.createRefreshToken(tokenParams);
        user.lifeTime = tokenParams.createTime + config.jwtLifeTime;

        return new Promise((resolve, reject) => {
            client = client.get({ plain: true });
            client.token = user.token;
            client.lifeTime = user.lifeTime;
            if (!config.jwtRefreshLifeTime) {
                return reject(this.Errors.validationError('jwtRefreshLifeTime is required in project config!'));
            }

            return resolve(user);
        });
    }
}

module.exports = Controller;
