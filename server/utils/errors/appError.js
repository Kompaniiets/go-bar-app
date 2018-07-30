const requiredParams = [
    'generalErrorCode',
    'generalErrorMessage',
    'errorCode',
    'errors',
    'status',
];

class AppError extends Error {

    /**
     *
     * @param {Object} params
     */
    constructor(params) {
        if (!(params instanceof Object)) {
            throw Error('params must be an object type');
        }
        requiredParams.forEach((field) => {
            if (!params[field]) {
                throw Error(`${field} is required`);
            }
        });
        super(params.generalErrorMessage);
        this.status = params.status;
        this.code = params.errorCode;
        this.generalErrorCode = params.generalErrorCode;
        this.generalErrorMessage = params.generalErrorMessage;
        this.errors = params.errors;
    }

    /**
     * format error to global format of http response
     * @param {string} version
     * @returns {{}}
     */
    toResponse(version = '1.0') {
        return {
            __v: version,
            code: this.generalErrorCode,
            message: this.message,
            errors: this.errors.map((item) => {
                return {
                    code: item.code,
                    message: item.message,
                    key: item.key,
                };
            }),
        };
    }
}

module.exports = AppError;
