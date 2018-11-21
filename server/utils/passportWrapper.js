const passport = require('passport');
const Strategy = require('passport-http-bearer').Strategy;
const jwt = require('jsonwebtoken');
const config = require('./../../config');
const CONSTANTS = require('../constants');
const ErrorFactory = require('./errors');
const Models = require('../models/v1');

const passportHandle = passport.use(new Strategy(
    (token, cb, user) => {
        Models.users.findOne({
            where: {
                token: CONSTANTS.AUTHORIZATION.STRATEGY + token
            }
        })
            .then((result) => {
                if (!result) {
                    return cb(ErrorFactory.forbiddenError(
                        CONSTANTS.ERROR_MESSAGES.INVALID_ACCESS_TOKEN,
                        [CONSTANTS.ERROR_MESSAGES.PATH_TOKEN, CONSTANTS.ERROR_CODES.INVALID_TOKEN]));
                }

                jwt.verify(token, config.jwtKey, {ignoreExpiration: false}, (err, decoded) => {
                    if (err || decoded.exp < Date.now()) {
                        return cb(ErrorFactory.unauthorizedError(
                            CONSTANTS.ERROR_MESSAGES.INVALID_TOKEN,
                            [CONSTANTS.STATUS_CODES.UNAUTHORIZED]));
                    }

                    return cb(null, result);
                });
            })
            .catch(() => cb(ErrorFactory.unauthorizedError(
                CONSTANTS.ERROR_MESSAGES.INVALID_TOKEN,
                [CONSTANTS.STATUS_CODES.UNAUTHORIZED])));
    }));

module.exports = passportHandle;
