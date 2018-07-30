const AppError = require('./appError');
const constants = require('./../../constants');

class Errors {
    static approximateErrorTypes(errorMessage, key, code) {
        if ((errorMessage instanceof Object) && errorMessage.name === 'AssertionError') {
            throw new Error('Joi validation error');
        }

        if ((errorMessage instanceof Object) && errorMessage.isJoi) {
            return [{
                message: errorMessage.details[0].message,
                key: errorMessage.details[0].path[0],
                code: code,
            }];
        }

        return [{
            message: errorMessage,
            key: key || '',
            code: code || '',
        }];
    }

    static validationError(generalErrorMessage, key = '', customErrorCode = null) {
        return new AppError({
            generalErrorCode: constants.STATUS_CODES.BAD_REQUEST,
            generalErrorMessage: constants.ERROR_MESSAGES.VALIDATOR_ERROR,
            errorCode: customErrorCode || constants.STATUS_CODES.BAD_REQUEST,
            errors: Errors.approximateErrorTypes(generalErrorMessage, key, customErrorCode || constants.STATUS_CODES.BAD_REQUEST),
            status: constants.STATUS_CODES.BAD_REQUEST,
        });
    }

    static databaseError(generalErrorMessage, key = '', customErrorCode = null) {
        return new AppError({
            generalErrorCode: constants.STATUS_CODES.INTERNAL_ERROR,
            generalErrorMessage: constants.ERROR_MESSAGES.DATABASE_ERROR,
            errorCode: customErrorCode || constants.STATUS_CODES.DATABASE_ERROR,
            errors: Errors.approximateErrorTypes(generalErrorMessage, key, customErrorCode || constants.STATUS_CODES.NOT_IMPLEMENTED),
            status: constants.STATUS_CODES.INTERNAL_ERROR,
        });
    }

    static notFound(generalErrorMessage = constants.ERROR_MESSAGES.NOT_FOUND_ERROR, key = '', customErrorCode = null) {
        return new AppError({
            generalErrorCode: constants.STATUS_CODES.NOT_FOUND,
            generalErrorMessage: constants.ERROR_MESSAGES.NOT_FOUND_ERROR,
            errorCode: customErrorCode || constants.STATUS_CODES.NOT_FOUND,
            errors: Errors.approximateErrorTypes(generalErrorMessage, key, customErrorCode || constants.STATUS_CODES.NOT_FOUND),
            status: constants.STATUS_CODES.NOT_FOUND,
        });
    }

    static notImplemented(generalErrorMessage = constants.ERROR_MESSAGES.NOT_IMPLEMENTED_ERROR, key = '', customErrorCode = null) {
        return new AppError({
            generalErrorCode: constants.STATUS_CODES.NOT_IMPLEMENTED,
            generalErrorMessage: constants.ERROR_MESSAGES.NOT_IMPLEMENTED_ERROR,
            errorCode: customErrorCode || constants.STATUS_CODES.NOT_IMPLEMENTED,
            errors: Errors.approximateErrorTypes(generalErrorMessage, key, customErrorCode || constants.STATUS_CODES.NOT_IMPLEMENTED),
            status: constants.STATUS_CODES.NOT_IMPLEMENTED,
        });
    }

    static internalServerError(generalErrorMessage, key = '', customErrorCode = null) {
        return new AppError({
            generalErrorCode: constants.STATUS_CODES.INTERNAL_ERROR,
            generalErrorMessage: constants.ERROR_MESSAGES.INTERNAL_ERROR,
            errorCode: customErrorCode || constants.STATUS_CODES.INTERNAL_ERROR,
            errors: Errors.approximateErrorTypes(generalErrorMessage, key, customErrorCode || constants.STATUS_CODES.INTERNAL_ERROR),
            status: constants.STATUS_CODES.INTERNAL_ERROR,
        });
    }

    static unauthorizedError(generalErrorMessage, key = '', customErrorCode = null) {
        return new AppError({
            generalErrorCode: constants.STATUS_CODES.UNAUTHORIZED,
            generalErrorMessage: constants.ERROR_MESSAGES.UNAUTHORIZED,
            errorCode: customErrorCode || constants.STATUS_CODES.UNAUTHORIZED,
            errors: Errors.approximateErrorTypes(generalErrorMessage, key, customErrorCode || constants.STATUS_CODES.UNAUTHORIZED),
            status: constants.STATUS_CODES.UNAUTHORIZED,
        });
    }

    static forbiddenError(generalErrorMessage, key = '', customErrorCode = null) {
        return new AppError({
            generalErrorCode: constants.STATUS_CODES.FORBIDDEN,
            generalErrorMessage: constants.ERROR_MESSAGES.FORBIDDEN,
            errorCode: customErrorCode || constants.STATUS_CODES.FORBIDDEN,
            errors: Errors.approximateErrorTypes(generalErrorMessage, key, customErrorCode || constants.STATUS_CODES.FORBIDDEN),
            status: constants.STATUS_CODES.FORBIDDEN,
        });
    }

    static unprocessedError(generalErrorMessage, key = '', customErrorCode = null) {
        return new AppError({
            generalErrorCode: constants.STATUS_CODES.UNPROCESSABLE_ENTITY,
            generalErrorMessage: constants.ERROR_MESSAGES.UNPROCESSABLE_ENTITY,
            errorCode: customErrorCode || constants.STATUS_CODES.UNPROCESSABLE_ENTITY,
            errors: Errors.approximateErrorTypes(generalErrorMessage, key, customErrorCode || constants.STATUS_CODES.UNPROCESSABLE_ENTITY),
            status: constants.STATUS_CODES.UNPROCESSABLE_ENTITY,
        });
    }

    static failedDependencyError(generalErrorMessage, key = '', customErrorCode = null) {
        return new AppError({
            generalErrorCode: constants.STATUS_CODES.FAILED_DEPENDENCY,
            generalErrorMessage: constants.ERROR_MESSAGES.FAILED_DEPENDENCY,
            errorCode: customErrorCode || constants.STATUS_CODES.FAILED_DEPENDENCY,
            errors: Errors.approximateErrorTypes(generalErrorMessage, key, customErrorCode || constants.STATUS_CODES.FAILED_DEPENDENCY),
            status: constants.STATUS_CODES.FAILED_DEPENDENCY,
        });
    }

    static conflictError(generalErrorMessage, key = '', customErrorCode = null) {
        return new AppError({
            generalErrorCode: constants.STATUS_CODES.CONFLICT,
            generalErrorMessage: constants.ERROR_MESSAGES.CONFLICT,
            errorCode: customErrorCode || constants.STATUS_CODES.CONFLICT,
            errors: Errors.approximateErrorTypes(generalErrorMessage, key, customErrorCode || constants.STATUS_CODES.CONFLICT),
            status: constants.STATUS_CODES.CONFLICT,
        });
    }

    static goneError(generalErrorMessage, key = '', customErrorCode = null) {
        return new AppError({
            generalErrorCode: constants.STATUS_CODES.GONE,
            generalErrorMessage: constants.ERROR_MESSAGES.GONE,
            errorCode: customErrorCode || constants.STATUS_CODES.GONE,
            errors: Errors.approximateErrorTypes(generalErrorMessage, key, customErrorCode || constants.STATUS_CODES.GONE),
            status: constants.STATUS_CODES.GONE,
        });
    }

    static notAllowed(generalErrorMessage, key = '', customErrorCode = null) {
        return new AppError({
            generalErrorCode: constants.STATUS_CODES.NOT_ALLOWED,
            generalErrorMessage: constants.ERROR_MESSAGES.NOT_ALLOWED,
            errorCode: customErrorCode || constants.STATUS_CODES.NOT_ALLOWED,
            errors: Errors.approximateErrorTypes(generalErrorMessage, key, customErrorCode || constants.STATUS_CODES.NOT_ALLOWED),
            status: constants.STATUS_CODES.NOT_ALLOWED,
        });
    }
}

module.exports = Errors;
