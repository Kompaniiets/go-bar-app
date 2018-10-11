const Models = require('./../../models/v1');

class SocialsMiddleware {
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
     * Delete all locations
     * @param req
     * @param res
     * @param next
     */
    static deleteLocation(req, res, next) {
        Models.locations.destroy({
            where: {
                id: req.body.id
            }
        })
            .then(() => next())
            .catch(next);
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
     * Get all user locations
     * @param req
     * @param res
     * @param next
     */
    static getLocationsList(req, res, next) {
        Models.locations.findAll({
            where: {
                userId: req.user.id
            }
        }).then((locations) => {
            req.locationModel = locations;
            return next();
        }).catch(next);
    }
}

module.exports = SocialsMiddleware;
