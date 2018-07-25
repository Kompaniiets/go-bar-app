const BaseValidator = require('./../../utils/baseValidator');
const CONSTANTS = require('./../../constants');

const Joi = require('joi');

class UsersValidator extends BaseValidator {
    /**
     * Validate user registration
     * @param req
     * @param res
     * @param next
     */
    static registerUser(req, res, next) {
        super.validate({
            firstName: Joi.string()
                .max(30)
                .required()
                .trim()
                .options({
                    language: {
                        string: {
                            max: CONSTANTS.ERROR_MESSAGES.NAME_INVALID,
                            trim: CONSTANTS.ERROR_MESSAGES.NAME_INVALID,
                        },
                        any: {
                            required: CONSTANTS.ERROR_MESSAGES.NAME_INVALID,
                            empty: CONSTANTS.ERROR_MESSAGES.NAME_INVALID,
                        },
                    },
                })
                .replace(CONSTANTS.REGEXP.MULTI_SPACE_TRIM, ' '),
            lastName: Joi.string()
                .max(30)
                .required()
                .trim()
                .options({
                    language: {
                        string: {
                            max: CONSTANTS.ERROR_MESSAGES.NAME_INVALID,
                            trim: CONSTANTS.ERROR_MESSAGES.NAME_INVALID,
                        },
                        any: {
                            required: CONSTANTS.ERROR_MESSAGES.NAME_INVALID,
                            empty: CONSTANTS.ERROR_MESSAGES.NAME_INVALID,
                        },
                    },
                })
                .replace(CONSTANTS.REGEXP.MULTI_SPACE_TRIM, ' '),
            email: Joi.string()
                .email()
                .required()
                .max(129)
                .regex(CONSTANTS.REGEXP.WITHOUT_LATIN_CHAR)
                .options({
                    language: {
                        string: {
                            email: CONSTANTS.ERROR_MESSAGES.EMAIL_VALIDATION,
                            regex: {
                                base: CONSTANTS.ERROR_MESSAGES.EMAIL_VALIDATION,
                            },
                        },
                    },
                }),
            password: Joi.string()
                .min(6)
                .max(50)
                .regex(CONSTANTS.REGEXP.PASSWORD_VALIDATION)
                .options({
                    language: {
                        string: {
                            max: CONSTANTS.ERROR_MESSAGES.MAX_PASSWORD_LENGTH,
                            min: CONSTANTS.ERROR_MESSAGES.MIN_PASSWORD_LENGTH,
                        },
                    },
                })
                .required(),
            confirmPassword: Joi.any().valid(Joi.ref('password'))
                .required()
                .options({
                    language: {
                        any: {
                            allowOnly: '!!Repeat password doesn’t match password!',
                        },
                    },
                }),
            isBar: Joi.boolean().required()
        }, req, res, next);
    }

    /**
     * Validate bar registration
     * @param req
     * @param res
     * @param next
     */
    static registerBar(req, res, next) {
        super.validate({
            barName: Joi.string()
                .max(50)
                .required()
                .trim()
                .replace(CONSTANTS.REGEXP.MULTI_SPACE_TRIM, ' '),
            phone: Joi.string()
                .regex(CONSTANTS.REGEXP.PHONE)
                .required()
                .trim()
                .replace(CONSTANTS.REGEXP.MULTI_SPACE_TRIM, ' '),
            email: Joi.string()
                .email()
                .required()
                .max(129)
                .regex(CONSTANTS.REGEXP.WITHOUT_LATIN_CHAR)
                .options({
                    language: {
                        string: {
                            email: CONSTANTS.ERROR_MESSAGES.EMAIL_VALIDATION,
                            regex: {
                                base: CONSTANTS.ERROR_MESSAGES.EMAIL_VALIDATION,
                            },
                        },
                    },
                }),
            password: Joi.string()
                .min(6)
                .max(50)
                .regex(CONSTANTS.REGEXP.PASSWORD_VALIDATION)
                .options({
                    language: {
                        string: {
                            max: CONSTANTS.ERROR_MESSAGES.MAX_PASSWORD_LENGTH,
                            min: CONSTANTS.ERROR_MESSAGES.MIN_PASSWORD_LENGTH,
                        },
                    },
                })
                .required(),
            confirmPassword: Joi.any().valid(Joi.ref('password'))
                .required()
                .options({
                    language: {
                        any: {
                            allowOnly: '!!Repeat password doesn’t match password!',
                        },
                    },
                }),
            isBar: Joi.boolean().required()
        }, req, res, next);
    }

    /**
     * Check user login
     * @param req
     * @param res
     * @param next
     */
    static login(req, res, next) {
        super.validate({
            email: Joi.string()
                .email()
                .required()
                .max(129)
                .regex(CONSTANTS.REGEXP.WITHOUT_LATIN_CHAR)
                .options({
                    language: {
                        string: {
                            email: CONSTANTS.ERROR_MESSAGES.LOGIN_VALIDATION,
                            regex: {
                                base: CONSTANTS.ERROR_MESSAGES.LOGIN_VALIDATION,
                            },
                        },
                    },
                }),
            password: Joi.string()
                .min(6)
                .max(50)
                .regex(CONSTANTS.REGEXP.PASSWORD_VALIDATION)
                .options({
                    language: {
                        string: {
                            max: CONSTANTS.ERROR_MESSAGES.LOGIN_VALIDATION,
                            min: CONSTANTS.ERROR_MESSAGES.LOGIN_VALIDATION,
                            regex: {
                                base: CONSTANTS.ERROR_MESSAGES.LOGIN_VALIDATION,
                            },
                        },
                    },
                })
                .required(),
        }, req, res, next);
    }
}

module.exports = UsersValidator;
