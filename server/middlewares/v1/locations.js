const Models = require('./../../models/v1');
const ErrorFactory = require('./../../utils/errors');
const CONSTANT = require('../../constants');

class LocationsMiddleware {
    /**
     * Basic user response
     * @param req
     * @param res
     * @param next
     */
    static basicResponse(req, res, next) {
        try {
            req.responseMessage = Models.locations.format().base(req.locationModel);

            if (req.locationModel.count)
                req.responseEntitiesCount = req.locationModel.count;

            return next();
        } catch (e) {
            next(e);
        }
    }

    /**
     * Save or update user locations
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    static saveOrUpdateLocation(req, res, next) {
        const newLocation = {
            userId: req.user.id,
            title: req.body.title,
            info: req.body.info,
            lat: req.body.lat,
            lng: req.body.lng,
        };

        Models.locations.find({
            where: {
                id: req.body.id,
            }
        })
            .then((location) => {
                if (!location)
                    return Models.locations.create(newLocation);

                return location.update(newLocation);
            })
            .then((data) => {
                req.locationModel = data;
                return next();
            })
            .catch(next);
    }

    /**
     * Check is location belongs to user
     * @param req
     * @param res
     * @param next
     */
    static checkIsItUserLocation(req, res, next) {
        Models.locations.find({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        }).then((result) => {
            if (!result)
                return next(ErrorFactory.notFound(CONSTANT.ERROR_MESSAGES.LOCATION_NOT_FOUND));

            return next();
        }).catch(next);
    }

    /**
     * Delete location by id
     * @param req
     * @param res
     * @param next
     */
    static deleteLocation(req, res, next) {
        Models.locations.destroy({
            where: {
                id: req.params.id,
            }
        })
            .then(() => next())
            .catch(next);
    }

    /**
     * Get all user locations
     * @param req
     * @param res
     * @param next
     */
    static getLocationsList(req, res, next) {
        Models.locations.findAndCountAll({
            where: {
                userId: req.user.id
            },
            include: [
                {
                    model: Models.schedules,
                    required: false,
                }
            ],
            limit: req.query.limit,
            offset: req.query.offset
        }).then((locations) => {
            req.locationModel = locations.rows;
            req.locationModel.count = locations.count;
            return next();
        }).catch(next);
    }
}

module.exports = LocationsMiddleware;
