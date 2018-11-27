const BaseValidator = require('./../../utils/baseValidator');
const Joi = require('joi');

class BarsValidator extends BaseValidator {
    /**
     * Validate bar registration
     * @param req
     * @param res
     * @param next
     */
    static barInfo(req, res, next) {
        super.queryValidate({
            date: Joi.string()
                .required(),
            duration: Joi.string()
                .required(),
        }, req, res, next);
    }

    static book(req, res, next) {
        super.validate({
            date: Joi.string()
                .required(),
            duration: Joi.string()
                .required(),
        }, req, res, next);
    }
}

module.exports = BarsValidator;
