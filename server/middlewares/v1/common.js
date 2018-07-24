const CONSTANTS = require('../../constants');
const ErrorFactory = require('../../utils/errors');

class CommonMiddlewares {
    static sendResponse(req, res, next) {
        if (req.responseHeaders) {
            res.set(req.responseHeaders);
        }

        if (!req.responseMessage)
            return res.status(CONSTANTS.STATUS_CODES.NO_CONTENT).send();

        const response = {
            __v: `${req.params.version.replace('v', '')}.0`,
            data: req.responseMessage,
        };


        if (req.hasOwnProperty('pagination')) {
            response.pagination = {
                total: req.responseEntitiesCount,
                nextOffset: req.query.offset + req.query.limit,
                nextPage: parseInt(((req.query.offset + req.query.limit) / req.query.limit) + 1),
            };
        }

        return res.send(response);
    }

    static addPagingQuery(req, res, next) {
        req.query.limit = parseInt(req.query.limit);
        req.query.offset = parseInt(req.query.offset);

        if (!req.query.updatedAt)
            req.query.updatedAt = Date.now();

        req.pagination = true;

        if ((!req.query.limit || req.query.limit < 1) || (req.query.limit && req.query.limit > CONSTANTS.PAGING.MAX_LIMIT)) {
            req.query.limit = CONSTANTS.PAGING.DEFAULT_LIMIT;
        }

        if (!req.query.offset || req.query.offset < CONSTANTS.PAGING.DEFAULT_OFFSET) {
            req.query.offset = CONSTANTS.PAGING.DEFAULT_OFFSET;
        }

        return next();
    }
}

module.exports = CommonMiddlewares;
