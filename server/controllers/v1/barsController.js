const Controller = require('./../../utils/controller');

class BarsController extends Controller {
    constructor(version) {
        super(version);
        this.getAllBars = [
            this.middlewares.common.addPagingQuery,
            this.middlewares.bars.getBarsList,
            this.middlewares.bars.countBars,
            this.middlewares.locations.basicResponse,
            this.middlewares.common.sendResponse
        ];
        this.getBarInfo = [
            this.validator.bars.barInfo,
            this.setParamsForQuery,
            this.middlewares.bars.getSingleBar,
            this.middlewares.bars.getBookedTables,
            this.middlewares.locations.basicResponse,
            this.middlewares.common.sendResponse
        ];
        this.bookTable = [
            this.validator.bars.book,
            this.setBodyForQuery,
            this.middlewares.bars.checkAlreadyBooked,
            this.middlewares.bars.getSingleBar,
            this.middlewares.bars.getBookedTables,
            this.middlewares.bars.checkFreeTables,
            this.middlewares.bars.getBookedTables,
            this.middlewares.locations.basicResponse,
            this.middlewares.common.sendResponse
        ];
    }

    setParamsForQuery(req, res, next) {
        req.barId = parseInt(req.params.id);
        req.bookedDate = req.query.date;
        req.bookedDuration = parseInt(req.query.duration);
        return next();
    }

    setBodyForQuery(req, res, next) {
        req.barId = req.body.id;
        req.bookedDate = req.body.date;
        req.bookedDuration = req.body.duration;
        return next();
    }
}

module.exports = BarsController;