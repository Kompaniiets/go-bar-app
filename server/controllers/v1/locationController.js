const Controller = require('./../../utils/controller');

class LocationsController extends Controller {
    constructor(version) {
        super(version);
        this.getLocation = [
            this.middlewares.locations.getLocationsList,
            this.middlewares.locations.basicResponse,
            this.middlewares.common.sendResponse
        ];
        this.addLocation = [
            this.validator.locations.locationsArray,
            this.middlewares.locations.saveOrUpdateLocation,
            this.middlewares.schedules.saveOrUpdateSchedule,
            this.middlewares.locations.basicResponse,
            this.middlewares.common.sendResponse
        ];
        this.delete = [
            this.middlewares.locations.checkIsItUserLocation,
            this.middlewares.locations.deleteLocation,
            this.middlewares.common.sendResponse
        ];
    }
}

module.exports = LocationsController;