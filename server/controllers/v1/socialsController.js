const Controller = require('./../../utils/controller');
const ErrorFactory = require('./../../utils/errors');

class SocialsController extends Controller {
    constructor(version) {
        super(version);
        this.fbLogin = [
            this.middlewares.socials.checkAccessToken,
            this.middlewares.socials.getFbProfile,
            this.middlewares.socials.checkSocialEmail,
            this.middlewares.socials.checkIsUserSocialIdAlreadyExists,
            this.middlewares.socials.socialAdapter,
            this.middlewares.users.getUserByEmail,
            this.middlewares.users.login,
            this.middlewares.users.basicResponse,
            this.middlewares.common.sendResponse
        ];
    }


}

module.exports = SocialsController;