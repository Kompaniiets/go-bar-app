const Controller = require('./../../utils/controller');
const ErrorFactory = require('./../../utils/errors');

class UsersController extends Controller {
    constructor(version) {
        super(version);
        this.test = [this.testAction];
        this.signup = [
            this.validateSignup,
            this.middlewares.users.encryptPassword,
            this.middlewares.users.saveUser,
            this.middlewares.users.findUserByEmail,
            this.middlewares.users.basicResponse,
            this.middlewares.common.sendResponse
        ];
        this.login = [
            this.validator.users.login,
            this.middlewares.users.findUserByEmail,
            this.middlewares.users.comparePassword,
            this.middlewares.users.login,
            this.middlewares.users.basicResponse,
            this.middlewares.common.sendResponse
        ];
        this.logout = [
            this.middlewares.users.logout,
            this.middlewares.common.sendResponse,
        ];
        this.role = [
            this.validator.users.role,
            this.middlewares.users.saveRole,
            this.middlewares.users.getSelf,
            this.middlewares.users.basicResponse,
            this.middlewares.common.sendResponse
        ];

        this.getProfile = [
            this.middlewares.users.getSelf,
            this.middlewares.users.basicResponse,
            this.middlewares.common.sendResponse
        ];
    }

    validateSignup(req, res, next) {
        if (req.body.isBar === false) {
            return this.validator.users.registerUser(req, res, next);
        }
        if (req.body.isBar === true) {
            return this.validator.users.registerBar(req, res, next);
        }

        return next(ErrorFactory.validationError('isBar flag missing!'));
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