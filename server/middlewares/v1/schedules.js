const Models = require('./../../models/v1');

class SchedulesMiddleware {
    /**
     * Basic user response
     * @param req
     * @param res
     * @param next
     */
    static basicResponse(req, res, next) {
        try {
            req.responseMessage = Models.schedules.format().base(req.scheduleModel);
            return next();
        } catch (e) {
            next(e);
        }
    }

    /**
     * Save or update schedule
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    static saveOrUpdateSchedule(req, res, next) {
        const newSchedule = {
            locationId: req.locationModel.id,
            opensIn: req.body.opensIn,
            closesIn: req.body.closesIn,
            numberOfTables: req.body.numberOfTables
        };

        Models.schedules.find({
            where: {
                locationId: req.locationModel.id,
            }
        })
            .then((schedules) => {
                if (!schedules)
                    return Models.schedules.create(newSchedule);

                return schedules.update(newSchedule);
            })
            .then((data) => {
                req.locationModel.schedule = data;
                return next();
            })
            .catch(next);
    }
}

module.exports = SchedulesMiddleware;
