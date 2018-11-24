const BaseValidator = require('./../../utils/baseValidator');
const Joi = require('joi');
const CONSTANTS = require('./../../constants');

class UsersValidator extends BaseValidator {
    /**
     * Validate bar registration
     * @param req
     * @param res
     * @param next
     */
    static locationsArray(req, res, next) {
        super.validate({
            id: Joi.number().integer()
                .allow(null)
                .optional(),
            userId: Joi.number()
                .integer()
                .allow(null)
                .optional(),
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
                .required(),
            createdAt: Joi.string()
                .allow('')
                .optional(),
            schedule: Joi.object({
                id: Joi.number()
                    .integer()
                    .allow(null)
                    .optional(),
                locationId: Joi.number()
                    .allow(null)
                    .integer(),
                opensIn: Joi.string()
                    .regex(CONSTANTS.REGEXP.TIME)
                    .required(),
                closesIn: Joi.string()
                    .regex(CONSTANTS.REGEXP.TIME)
                    .required(),
                numberOfTables: Joi.number().integer()
                    .max(100)
                    .required(),
                createdAt: Joi.string()
                    .allow('')
                    .optional()
            }),
        }, req, res, next);
    }
}

module.exports = UsersValidator;
