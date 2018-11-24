const Models = require('./../../models/v1');
const ErrorFactory = require('./../../utils/errors');
const LocationsQueries = require('../../helpers/locationsQueries');
const CONSTANTS = require('../../constants');

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
    static getBarsList(req, res, next) {
        let scopes = [];

        req.bindQuery = {
            lat: req.query.lat,
            lng: req.query.lng,
            radius: parseInt(req.query.radius) || CONSTANTS.DEFAULT_VALUES.DEFAULT_RADIUS,
            limit: req.query.limit,
            offset: req.query.offset,
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
     * Count all bars by coordinates
     * @param req
     * @param res
     * @param next
     */
    static countBars(req, res, next) {
        Models.sequelize.query(LocationsQueries.COUNT_LOCATIONS,
            {
                bind: req.bindQuery,
                type: Models.sequelize.QueryTypes.SELECT
            })
            .then((count) => {
                req.locationModel.count = count[0].countRows;
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
            return next(ErrorFactory.validationError(CONSTANTS.ERROR_MESSAGES.WRONG_ID_PARAMETER));

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
            return next(ErrorFactory.validationError(CONSTANTS.ERROR_MESSAGES.NO_FREE_TABLES));

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
            if (result)
                return next(ErrorFactory.conflictError(CONSTANTS.ERROR_MESSAGES.TABLE_ALREADY_BOOKED));
            return next();
        }).catch(next);
    }

    static saveAvatar(req, res, next) {
        let fileExtension;

        if (!req.file)
            return next(ErrorFactory.validationError(CONSTANTS.ERROR_MESSAGES.IMAGE_MISSING));

        fileExtension = req.file.originalname.split('.').pop();

        function handleCreation(req, res, next) {
            Models.images.create({
                url: `${req.file.filename}.${fileExtension}`
            }).then((image) => {
                req.userModel.imageId = image.id;
                req.userModel.save().then((updatedUser) => {
                    req.userModel = updatedUser;
                    return next();
                });
            });
        }

        Models.images.find({
            where: { id: req.user.imageId }
        }).then((destroy) => {
            if (!destroy) {
                return handleCreation(req, res, next);
            }

            destroy.destroy().then(() => handleCreation(req, res, next));
        }).catch(next);
    }
}

module.exports = BarsMiddleware;
