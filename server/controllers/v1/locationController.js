const Controller = require('./../../utils/controller');
const ErrorFactory = require('./../../utils/errors');

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
            this.middlewares.locations.basicResponse,
            this.middlewares.common.sendResponse
        ];
    }
}

module.exports = LocationsController;