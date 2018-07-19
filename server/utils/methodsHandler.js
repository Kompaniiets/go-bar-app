const ErrorFactory = require('../utils/errors');
const CONSTANTS = require('../constants');

function error405(req, res, next) {
    next(ErrorFactory.notAllowed(CONSTANTS.ERROR_MESSAGES.NOT_ALLOWED));
}

module.exports = (router) => {
    for (let i = 0; i < router.api.stack.length; i += 1) {
        if (router.api.stack[i].route) {
            router.api.stack[i].route.all(error405);
        }
    }
};
