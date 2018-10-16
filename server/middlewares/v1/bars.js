const Models = require('./../../models/v1');
const ErrorFactory = require('./../../utils/errors');

class BarsMiddleware {
    /**
     * Basic user response
     * @param req
     * @param res
     * @param next
     */
    static basicResponse(req, res, next) {
        try {
            req.responseMessage = Models.locations.format().base(req.locationModel);
            return next();
        } catch (e) {
            next(e);
        }
    }

    static getAllBars(req, res, next) {
        Models.locations.findAll({
            include: [
                {
                    model: Models.schedules,
                    required: true,
                }
            ]
        }).then((result) => {
            req.locationModel = result;
            return next();
        }).catch(next);
    }
}

module.exports = BarsMiddleware;
