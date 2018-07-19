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
                let message;
                let code;
                let key;

                if (item.details) {
                    code = item.details[0].code[0];
                    message = item.details[0].message;
                    key = item.details[0].path[0];
                } else {
                    code = this.code;
                    message = this.message;
                    key = '';
                }

                return {
                    code,
                    message,
                    key,
                };
            }),
        };
    }
}

module.exports = AppError;
