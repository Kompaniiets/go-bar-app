const Controller = require('./../../utils/controller');

class BarsController extends Controller {
    constructor(version) {
        super(version);
        this.getAllBars = [
            this.middlewares.bars.getAllBars,
            this.middlewares.locations.basicResponse,
            this.middlewares.common.sendResponse
        ];
        this.getBarInfo = [
            this.middlewares.bars.getSingleBar,
            this.middlewares.bars.checkFreeTables,
            this.middlewares.locations.basicResponse,
            this.middlewares.common.sendResponse
        ];
    }
}

module.exports = BarsController;