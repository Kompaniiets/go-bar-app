const Controller = require('./../../utils/controller');
const fileUploader = require('./../../utils/fileUploader/upload');

class UsersController extends Controller {
    constructor(version) {
        super(version);
        this.test = [this.testAction];
        this.signup = [
            this.validator.users.registerUser,
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

        this.updateProfile = [
            this.middlewares.users.getSelf,
            this.middlewares.users.updateProfile,
            this.middlewares.users.basicResponse,
            this.middlewares.common.sendResponse
        ];
        this.uploadAvatar = [
            fileUploader,
            this.middlewares.users.getSelf,
            this.middlewares.bars.saveAvatar,
            this.middlewares.users.getSelf,
            this.middlewares.users.basicResponse,
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