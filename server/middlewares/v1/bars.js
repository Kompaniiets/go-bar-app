const Models = require('./../../models/v1');
const ErrorFactory = require('./../../utils/errors');
const LocationsQueries = require('../../helpers/locationsQueries');

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

    /**
     * Get all bars in radius
     * @param req
     * @param res
     * @param next
     */
    static getAllBars(req, res, next) {
        let scopes = [];

        req.bindQuery = {
            lat: req.query.lat,
            lng: req.query.lng,
            radius: parseInt(req.query.radius) || 10,
            limit: req.query.limit || 10,
            offset: req.query.offset || 0,
        };

        Models.sequelize.query(LocationsQueries.GET_LOCATIONS_BY_PARAMS,
            {
                bind: req.bindQuery,
                type: Models.sequelize.QueryTypes.SELECT
            })
            .tap(locations => scopes.push({
                method: ['byIds', locations.map((location) => location.id)]
            }))
            .then((result) => {
                if (!result.length)
                    return [];

                scopes.push({method: ['includeSchedules', Models, true]});

                return Models.locations
                    .scope(scopes)
                    .findAll();
            })
            .then((data) => {
                req.locationModel = data;
                return next();
            })
            .catch(next);
    }
}

module.exports = BarsMiddleware;
