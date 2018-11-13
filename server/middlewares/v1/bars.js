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

    /**
     * Get booked tables
     * @param req
     * @param res
     * @param next
     */
    static getBookedTables(req, res, next) {
        Models.bookings
            .scope({ method: ['checkFreeTables', Models, req] })
            .findAndCountAll({
                attributes: [
                    'id',
                    'userId',
                    'locationId',
                    'startAt',
                    'duration',
                    [Models.sequelize.literal('DATE_ADD(startAt, INTERVAL duration MINUTE)'), 'endAt']
                ],
                where: {
                    locationId: req.barId,
                }
            })
            .then((result) => {
                req.locationModel.bookedTablesCount = result.count;
                req.locationModel.bookedTables = result.rows;
                return next();
            }).catch(next);
    }

    /**
     * Check free tables
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    static checkFreeTables(req, res, next) {
        if ((req.locationModel.schedule.numberOfTables - req.locationModel.bookedTablesCount) === 0)
            return next(ErrorFactory.validationError('No free tables!'));

        Models.bookings.create({
            userId: req.user.id,
            locationId: req.locationModel.id,
            startAt: req.bookedDate,
            duration: req.bookedDuration
        })
            .then(() => next())
            .catch(next);
    }

    /**
     * Ckeck if user already booked tables in this time
     * @param req
     * @param res
     * @param next
     */
    static checkAlreadyBooked(req, res, next) {
        Models.bookings
            .scope({ method: ['checkFreeTables', Models, req] })
            .find({
                where: {
                    userId: req.user.id,
                    locationId: req.barId,
                },
            }).then((result) => {
                if(result)
                    return next(ErrorFactory.conflictError('You already booked the table in this time range'));
                return next();
            }).catch(next);
    }
}

module.exports = BarsMiddleware;
