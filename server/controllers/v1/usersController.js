const Controller = require('./../../utils/controller');
const Models = require('../../models/v1');
const ErrorFactory = require('./../../utils/errors');
const config = require('./../../../config');

class UsersController extends Controller {
    constructor(version) {
        super(version);
        this.test = [this.testAction];
        this.login = [
            this.loginUser
        ];
    }

    loginUser(req, res, next) {
        console.log(req.body);
        return res.send({ message: req.body });
    }

    /**
     * Testing actions here
     * @param req
     * @param res
     * @returns {*}
     * @private
     */
    testAction(req, res) {
        return res.send({ message: 'test!' });
    }
}

module.exports = UsersController;