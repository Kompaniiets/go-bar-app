const Models = require('./../../models/v1');
const ErrorFactory = require('./../../utils/errors');
const LocationsQueries = require('../../helpers/locationsQueries');
const moment = require('moment');

class BarsMiddleware {
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

                scopes.push({ method: ['includeSchedules', Models, true] });
                scopes.push({ method: ['includeBar', Models, true] });

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

    /**
     * Get bar details info by id
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    static getSingleBar(req, res, next) {
        req.barId = parseInt(req.params.id);
        const scopes = [
            { method: ['includeSchedules', Models, true] },
            { method: ['includeBar', Models, true] }
        ];

        if (isNaN(req.barId))
            return next(ErrorFactory.validationError('Wrong id parameter!'));

        Models.locations
            .scope(scopes)
            .find({
                where: { id: req.barId }
            })
            .then((data) => {
                req.locationModel = data;
                return next();
            }).catch(next);
    }

    static checkFreeTables(req, res, next) {
        const getDate = moment(req.query.date).format('YYYY-MM-DD');
        const endDate = getDate + ' ' + req.locationModel.schedule.closesIn;

        Models.bookings
            .findAndCountAll({
                attributes:[
                    'id',
                    'userId',
                    'startAt',
                    'duration',
                    [Models.sequelize.literal('DATE_ADD(startAt, INTERVAL TIME(duration) HOUR_SECOND)'), 'endDate']
                ],
                where: {
                    locationId: req.barId,
                    startsAt: Models.sequelize.literal(`
                        (
                            DATE_ADD(startAt, INTERVAL TIME(duration) HOUR_SECOND) >= '${req.query.date}'
                            AND startAt <= '${endDate}'
                        )`
                    )
                }
            })
            .then((result) => {
                req.locationModel.bookedTablesCount = result.count;
                req.locationModel.bookedTables = result.rows;
                return next();
            }).catch(next);
    }
}

module.exports = BarsMiddleware;
