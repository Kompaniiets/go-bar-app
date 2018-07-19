const Joi = require('joi');
const Errors = require('./errors');

/**
 * JOI validation wrapper
 */

const validationOptions = {
    language: {
        key: '{{key}} ',
    },
};

class BaseValidator {
    /**
     * Just call validate in child classes.
     * @param schema
     * @param req
     * @param res
     * @param next
     */
    static validate(schema, req, res, next) {
        schema = Joi.object().keys(schema);
        Joi.validate(req.body, schema, validationOptions, (err, result) => {
            if (err) {
                return next(Errors.validationError(err));
            }
            req.body = result;
            return next();
        });
    }

    static queryValidate(schema, req, res, next, stripUnknown = false) {

        let queryValidationOptions = {};
        Object.assign(queryValidationOptions, validationOptions);

        queryValidationOptions.stripUnknown = stripUnknown;

        schema = Joi.object().keys(schema);
        Joi.validate(req.query, schema, queryValidationOptions, (err, result) => {
            if (err) {
                return next(Errors.validationError(err));
            }
            req.query = result;
            return next();
        });
    }
}

module.exports = BaseValidator;
