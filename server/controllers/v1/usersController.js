const Controller = require('./../../utils/controller');
const Models = require('../../models/v1');
const ErrorFactory = require('./../../utils/errors');

class UsersController extends Controller {
    constructor(version) {
        super(version);
        this.test = [this.testAction];
        this.register = [
            this.validator.users.register,
            this.middlewares.users.saveUser,
            this.middlewares.common.sendResponse
        ];
        this.login = [
            // this.validator.users.login,
            this.middlewares.users.findUserByEmail,
            this.middlewares.common.sendResponse
        ];
    }

    /**
     * Testing actions here
     * @param req
     * @param res
     * @returns {*}
     * @private
     */
    testAction(req, res) {
        return res.send('test');
    }
}

module.exports = UsersController;