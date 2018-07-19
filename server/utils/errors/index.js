const AppError = require('./appError');
const constants = require('./../../constants');

class Errors {
    static approximateErrorTypes(errorMessage, path = [], code) {
        if ((errorMessage instanceof Object) && errorMessage.name === 'AssertionError') {
            throw new Error('Joi validation error');
        }

        if ((errorMessage instanceof Object) && errorMessage.isJoi) {
            return [{
                details: [{
                    message: errorMessage.details[0].message,
                    path: [errorMessage.details[0].path[0]],
                    code: [code],
                }],
            }];
        }

        return [{
            details: [{
                message: errorMessage,
                path: path[0] ? [path[0]] : [''],
                code: path[1] ? [path[1]] : [code],
            }],
        }];
    }

    static validationError(generalErrorMessage, path = [], options = {}) {
        return new AppError({
            generalErrorCode: options.generalErrorCode || constants.STATUS_CODES.BAD_REQUEST,
            generalErrorMessage: options.generalErrorMessage || constants.ERROR_MESSAGES.VALIDATOR_ERROR,
            errorCode: options.errorCode || constants.STATUS_CODES.BAD_REQUEST,
            errors: Errors.approximateErrorTypes(generalErrorMessage, path, constants.STATUS_CODES.BAD_REQUEST),
            status: options.status || constants.STATUS_CODES.BAD_REQUEST,
        });
    }

    static databaseError(generalErrorMessage, path = [], options = {}) {
        return new AppError({
            generalErrorCode: options.generalErrorCode || constants.STATUS_CODES.INTERNAL_ERROR,
            generalErrorMessage: options.generalErrorMessage || constants.ERROR_MESSAGES.DATABASE_ERROR,
            errorCode: options.errorCode || constants.STATUS_CODES.DATABASE_ERROR,
            errors: Errors.approximateErrorTypes(generalErrorMessage, path, constants.STATUS_CODES.NOT_IMPLEMENTED),
            status: options.status || constants.STATUS_CODES.INTERNAL_ERROR,
        });
    }

    static notFound(generalErrorMessage = constants.ERROR_MESSAGES.NOT_FOUND_ERROR, path = [], options = {}) {
        return new AppError({
            generalErrorCode: options.generalErrorCode || constants.STATUS_CODES.NOT_FOUND,
            generalErrorMessage: options.generalErrorMessage || constants.ERROR_MESSAGES.NOT_FOUND_ERROR,
            errorCode: options.errorCode || constants.STATUS_CODES.NOT_FOUND,
            errors: Errors.approximateErrorTypes(generalErrorMessage, path, constants.STATUS_CODES.NOT_FOUND),
            status: options.status || constants.STATUS_CODES.NOT_FOUND,
        });
    }

    static notImplemented(generalErrorMessage = constants.ERROR_MESSAGES.NOT_IMPLEMENTED_ERROR, path = [], options = {}) {
        return new AppError({
            generalErrorCode: options.generalErrorCode || constants.STATUS_CODES.NOT_IMPLEMENTED,
            generalErrorMessage: options.generalErrorMessage || constants.ERROR_MESSAGES.NOT_IMPLEMENTED_ERROR,
            errorCode: options.errorCode || constants.STATUS_CODES.NOT_IMPLEMENTED,
            errors: Errors.approximateErrorTypes(generalErrorMessage, path, constants.STATUS_CODES.NOT_IMPLEMENTED),
            status: options.status || constants.STATUS_CODES.NOT_IMPLEMENTED,
        });
    }

    static internalServerError(generalErrorMessage, path = [], options = {}) {
        return new AppError({
            generalErrorCode: options.generalErrorCode || constants.STATUS_CODES.INTERNAL_ERROR,
            generalErrorMessage: options.generalErrorMessage || constants.ERROR_MESSAGES.INTERNAL_ERROR,
            errorCode: options.errorCode || constants.STATUS_CODES.INTERNAL_ERROR,
            errors: Errors.approximateErrorTypes(generalErrorMessage, path, constants.STATUS_CODES.INTERNAL_ERROR),
            status: options.status || constants.STATUS_CODES.INTERNAL_ERROR,
        });
    }

    static unauthorizedError(generalErrorMessage, path = [], options = {}) {
        return new AppError({
            generalErrorCode: options.generalErrorCode || constants.STATUS_CODES.UNAUTHORIZED,
            generalErrorMessage: options.generalErrorMessage || constants.ERROR_MESSAGES.UNAUTHORIZED,
            errorCode: options.errorCode || constants.STATUS_CODES.UNAUTHORIZED,
            errors: Errors.approximateErrorTypes(generalErrorMessage, path, constants.STATUS_CODES.UNAUTHORIZED),
            status: options.status || constants.STATUS_CODES.UNAUTHORIZED,
        });
    }

    static forbiddenError(generalErrorMessage, path = [], options = {}) {
        return new AppError({
            generalErrorCode: options.generalErrorCode || constants.STATUS_CODES.FORBIDDEN,
            generalErrorMessage: options.generalErrorMessage || constants.ERROR_MESSAGES.FORBIDDEN,
            errorCode: options.errorCode || constants.STATUS_CODES.FORBIDDEN,
            errors: Errors.approximateErrorTypes(generalErrorMessage, path, constants.STATUS_CODES.FORBIDDEN),
            status: options.status || constants.STATUS_CODES.FORBIDDEN,
        });
    }

    static unprocessedError(generalErrorMessage, path = [], options = {}) {
        return new AppError({
            generalErrorCode: options.generalErrorCode || constants.STATUS_CODES.UNPROCESSABLE_ENTITY,
            generalErrorMessage: options.generalErrorMessage || constants.ERROR_MESSAGES.UNPROCESSABLE_ENTITY,
            errorCode: options.errorCode || constants.STATUS_CODES.UNPROCESSABLE_ENTITY,
            errors: Errors.approximateErrorTypes(generalErrorMessage, path, constants.STATUS_CODES.UNPROCESSABLE_ENTITY),
            status: options.status || constants.STATUS_CODES.UNPROCESSABLE_ENTITY,
        });
    }

    static failedDependencyError(generalErrorMessage, path = [], options = {}) {
        return new AppError({
            generalErrorCode: options.generalErrorCode || constants.STATUS_CODES.FAILED_DEPENDENCY,
            generalErrorMessage: options.generalErrorMessage || constants.ERROR_MESSAGES.FAILED_DEPENDENCY,
            errorCode: options.errorCode || constants.STATUS_CODES.FAILED_DEPENDENCY,
            errors: Errors.approximateErrorTypes(generalErrorMessage, path, constants.STATUS_CODES.FAILED_DEPENDENCY),
            status: options.status || constants.STATUS_CODES.FAILED_DEPENDENCY,
        });
    }

    static conflictError(generalErrorMessage, path = [], options = {}) {
        return new AppError({
            generalErrorCode: options.generalErrorCode || constants.STATUS_CODES.CONFLICT,
            generalErrorMessage: options.generalErrorMessage || constants.ERROR_MESSAGES.CONFLICT,
            errorCode: options.errorCode || constants.STATUS_CODES.CONFLICT,
            errors: Errors.approximateErrorTypes(generalErrorMessage, path, constants.STATUS_CODES.CONFLICT),
            status: options.status || constants.STATUS_CODES.CONFLICT,
        });
    }

    static goneError(generalErrorMessage, path = [], options = {}) {
        return new AppError({
            generalErrorCode: options.generalErrorCode || constants.STATUS_CODES.GONE,
            generalErrorMessage: options.generalErrorMessage || constants.ERROR_MESSAGES.GONE,
            errorCode: options.errorCode || constants.STATUS_CODES.GONE,
            errors: Errors.approximateErrorTypes(generalErrorMessage, path, constants.STATUS_CODES.GONE),
            status: options.status || constants.STATUS_CODES.GONE,
        });
    }

    static notAllowed(generalErrorMessage, path = [], options = {}) {
        return new AppError({
            generalErrorCode: options.generalErrorCode || constants.STATUS_CODES.NOT_ALLOWED,
            generalErrorMessage: options.generalErrorMessage || constants.ERROR_MESSAGES.NOT_ALLOWED,
            errorCode: options.errorCode || constants.STATUS_CODES.NOT_ALLOWED,
            errors: Errors.approximateErrorTypes(generalErrorMessage, path, constants.STATUS_CODES.NOT_ALLOWED),
            status: options.status || constants.STATUS_CODES.NOT_ALLOWED,
        });
    }
}

module.exports = Errors;
