const Models = require('./../../models/v1');
const ErrorFactory = require('./../../utils/errors');
const CONSTANTS = require('./../../constants');
const Password = require('../../helpers/password');

class UsersMiddleware {
    /**
     * Basic user response
     * @param req
     * @param res
     * @param next
     */
    static basicResponse(req, res, next) {
        try {
            if (!req.userModel.isBar) {
                req.responseMessage = Models.users.format().baseUser(req.userModel);
                return next();
            }

            req.responseMessage = Models.users.format().baseBar(req.userModel);
            return next();
        } catch (e) {
            next(e);
        }
    }

    /**
     * Encrypt user password using salt
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    static encryptPassword(req, res, next) {
        req.body.salt = Password.generateSalt();
        res.locals.rawPassword = req.body.password;
        req.body.password = Password.hash(req.body.password + req.body.salt);
        return next();
    }

    /**
     * Compare user password
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    static comparePassword(req, res, next) {
        if (!Password.compare(req.body.password + req.userModel.salt, req.userModel.password)) {
            return next(ErrorFactory.forbiddenError(CONSTANTS.ERROR_MESSAGES.AUTHORIZATION_FAILED));
        }

        return next();
    }

    /**
     * Create access and refresh token on user login
     * @param req
     * @param res
     * @param next
     */
    static login(req, res, next) {
        this.createUserToken(req.userModel)
            .then((user) => {
                req.userModel.token = user.token;
                req.userModel.refreshToken = user.refreshToken;
                req.userModel.lifeTime = user.lifeTime;
                return req.userModel.save().then(() => {
                    req.responseMessage = req.userModel;
                    return next();
                });
            })
            .catch(next);
    }

    static logout(req, res, next) {
        Models.users.update({
            token: null
        }, {
            where: {
                id: req.user.id
            }
        })
            .then(() => next())
            .catch(next);
    }

    /**
     * Check user exist by email
     * @param req
     * @param res
     * @param next
     */
    static findUserByEmail(req, res, next) {
        Models.users.find({
            where: {
                email: req.body.email
            }
        }).then((user) => {
            if (!user) {
                return next(ErrorFactory.notFound(
                    CONSTANTS.ERROR_MESSAGES.INVALID_EMAIL,
                    CONSTANTS.ERROR_MESSAGES.PATH_EMAIL
                ));
            }

            req.user = user;
            req.userModel = user;
            req.responseMessage = user;
            return next();
        }).catch(next);
    }

    /**
     * Save user info
     * @param req
     * @param res
     * @param next
     */
    static saveUser(req, res, next) {
        req.body.isVerified = true;

        Models.users.create(req.body)
            .then(() => next())
            .catch((err) => {
                if (err.errors && err.errors.length > 0
                    && err.errors[0].type === CONSTANTS.ERROR_MESSAGES.UNIQUE_VIOLATION) {
                    return next(ErrorFactory.unprocessedError(
                        CONSTANTS.ERROR_MESSAGES.EMAIL_TAKEN,
                        CONSTANTS.ERROR_MESSAGES.PATH_EMAIL
                    ));
                }
                return next(err);
            });
    }

    /**
     * Get user info by id
     * @param req
     * @param res
     * @param next
     */
    static getSelf(req, res, next) {
        Models.users.find({
            where: {
                id: req.user.id,
            },
        }).then((user) => {
            req.user = user;
            req.userModel = user;
            req.responseMessage = user;
            return next();
        }).catch(next);
    }

    /**
     * get user info by email
     * @param req
     * @param res
     * @param next
     */
    static getUserByEmail(req, res, next) {
        Models.users
            .find({
                where: {
                    email: req.userModel.email,
                },
            }).then((user) => {
                if (!user)
                    return next(ErrorFactory.notFound(CONSTANTS.ERROR_MESSAGES.RECORD_NOT_FOUND, ['']));

                req.user = user;
                req.userModel = user;
                req.oldToken = req.user.token;

                return next();
            }).catch(next);
    }
}

module.exports = UsersMiddleware;
