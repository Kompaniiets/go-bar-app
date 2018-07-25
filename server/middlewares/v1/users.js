const Models = require('./../../models/v1');
const ErrorFactory = require('./../../utils/errors');
const CONSTANTS = require('./../../constants');

class UsersMiddleware {
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
            if (!user)
                return next(ErrorFactory.notFound('User not found'));

            req.user = user;
            req.responseMessage = {
                email: user.email,
                id: user.id
            };
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
        req.body.isBar = false;
        req.body.salt = 'sdfs324dsg4tqweg';
        req.body.isVerified = true;

        Models.users.create(req.body)
            .then((user) => {
                req.user = user;
                req.responseMessage = {
                    email: user.email,
                    id: user.id
                };
                return next();
            })
            .catch((err) => {
                if (err.errors && err.errors.length > 0
                    && err.errors[0].type === CONSTANTS.ERROR_MESSAGES.UNIQUE_VIOLATION) {
                    return next(ErrorFactory.unprocessedError(
                        CONSTANTS.ERROR_MESSAGES.EMAIL_TAKEN,
                        [CONSTANTS.ERROR_MESSAGES.PATH_EMAIL]));
                }
                return next(err);
            });
    }
}

module.exports = UsersMiddleware;
