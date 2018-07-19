const logger = require('./logger');
const AppError = require('./errors/appError');
const Errors = require('./errors');

const fs = require('fs');

function getVersionFromRequest(request) {
    let version;
    if (request.params.version) {
        version = +request.params.version.replace('v', '');
    } else {
        version = +request.url.match(/\d+/);
    }
    return version ? version.toFixed(1) : '1.0';
}

module.exports = (err, req, res, next) => {
    // do not log errors in test environment
    if (process.env.NODE_ENV !== 'test') {
        logger.error(err);
    }

    // delete files from disk if exists
    if (req.files) {
        Object.keys(req.files).forEach((file) => {
            fs.unlink(req.files[file].path, () => 0);
        });
    }

    // in case of unknown error type - throw Internal Server Error
    if (!(err instanceof AppError)) {
        err = Errors.internalServerError(err.message);
    }

    return res.status(err.status)
        .json(err.toResponse(getVersionFromRequest(req)))
        .end();
};
