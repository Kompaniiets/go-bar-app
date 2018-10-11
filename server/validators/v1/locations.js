const BaseValidator = require('./../../utils/baseValidator');
const Joi = require('joi');

class UsersValidator extends BaseValidator {
    /**
     * Validate bar registration
     * @param req
     * @param res
     * @param next
     */
    static locationsArray(req, res, next) {
        super.validate({
            id: Joi.number().integer().allow(null).optional(),
            title: Joi.string()
                .max(50)
                .required(),
            info: Joi.string()
                .max(256)
                .required(),
            lat: Joi.number()
                .min(-90)
                .max(90)
                .required(),
            lng: Joi.number()
                .min(-90)
                .max(90)
                .required()
        }, req, res, next);
    }
}

module.exports = UsersValidator;
