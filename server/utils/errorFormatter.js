const sequlize = require('sequelize');
const Errors = require('./errors');
const AppError = require('./errors/appError');
const LIMIT_FILE_SIZE = 'LIMIT_FILE_SIZE';
const CONSTANTS = require('./../constants');
const ErrorFactory = require('./../utils/errors');

/**
 * Middleware for error handling
 * @param next
 */
module.exports = (err, req, res, next) => {
    if (err instanceof AppError) {
        return next(err);
    }

    handleSequelizeErrors(err);
    handleMulterErrors(err, req, res, next);
    handleSystemErrors(err, req, res, next);
    handleStripeErrors(err, req, res, next);

    let error;
    if (err.status === 422) {
        error = Errors.unprocessedError(err);
    } else {
        error = Errors.validationError(err);
    }
    return next(error);
};

function handleSystemErrors(err, req, res, next) {
    if(err instanceof TypeError)
    return next(ErrorFactory.internalServerError(
        err.message, []
    ));
}

/**
 * Handle multer error
 * @param err
 * @param req
 * @param res
 * @param next
 */
function handleMulterErrors(err, req, res, next) {

    if(err.code === LIMIT_FILE_SIZE) {
        return next(ErrorFactory.validationError(
            CONSTANTS.ERROR_MESSAGES.IMAGE_TOO_LARGE,
            [CONSTANTS.ERROR_MESSAGES.PATH_IMAGE]
        ));

    }
}

function handleStripeErrors(err, req, res, next) {
    if(err.type === CONSTANTS.ERROR_MESSAGES.TYPE_STRIPE_ERROR || err.type === CONSTANTS.ERROR_MESSAGES.TYPE_STRIPE_CARD_ERROR) {
        return next(ErrorFactory.validationError(
            err.message,
            []
        ));

    }
}

/**
 * Handle Sequelize errors
 * @private
 * @param error
 */
function handleSequelizeErrors(error) {
    switch (error.constructor) {
    case sequlize.ValidationError:
        handleSequelizeValidationError(error);
        break;
    case sequlize.UniqueConstraintError:
    case sequlize.ExclusionConstraintError:
    case sequlize.ForeignKeyConstraintError:
        handleSequelizeConstraintError(error);
        break;
    default:
        break;
    }
}

/**
 * Handle Sequelize validation error
 * @private
 * @param error
 */
function handleSequelizeValidationError(error) {
    error.status = 400;

    const fields = [];

    if (error.errors) {
        error.errors.forEach((err) => {
            fields.push({
                field: err.path,
                message: err.message,
            });
        });
    }
    error.fields = fields;
}

/**
 * Handle Sequelize constraint error
 * @private
 * @param error
 */
function handleSequelizeConstraintError(error) {
    error.status = 422;
}
