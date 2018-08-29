const Models = require('./../../models/v1');
const request = require('request');
const ErrorFactory = require('./../../utils/errors');
const config = require('../../../config');
const CONSTANTS = require('./../../constants');
const socials = require('../../utils/social/socialService');

class SocialsMiddleware {
    /**
     * Basic user response
     * @param req
     * @param res
     * @param next
     */
    static basicResponse(req, res, next) {
        try {
            if (!req.userModel.isBar) {
                req.responseMessage = Models.users.format().baseUser(req.userModel);
                return next();
            }

            req.responseMessage = Models.users.format().baseBar(req.userModel);
            return next();
        } catch (e) {
            next(e);
        }
    }

    /**
     * Check is access token exist
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    static checkAccessToken(req, res, next) {
        if (!req.body.accessToken) {
            return next(ErrorFactory.validationError('accessToken is required!'));
        }

        return next();
    }

    /**
     * get user profile from FB use accessToken
     * @param req
     * @param res
     * @param next
     */
    static getFbProfile(req, res, next) {
        const query = {
            fields: config.socials.fields,
            access_token: req.body.accessToken
        };

        request.get({
            url: `${config.socials.url}/me`,
            qs: query
        }, (err, result) => {
            if (err) {
                return next(err);
            }

            req.socialProfile = JSON.parse(result.body);
            req.socialType = CONSTANTS.SOCIALS.FACEBOOK;
            return next();
        });
    }

    /**
     * Check if email returned by social network
     * @param req
     * @param res
     * @param next
     */
    static checkSocialEmail(req, res, next) {
        if (!req.socialProfile.email) {
            return next(ErrorFactory.notFound(
                'Email was not returned by social network',
                [CONSTANTS.ERROR_MESSAGES.PATH_EMAIL]));
        }
        return next();
    }

    /**
     * Check is user with social id already exists
     * @param req
     * @param res
     * @param next
     */
    static checkIsUserSocialIdAlreadyExists(req, res, next) {
        req.needCreateProfile = false;

        Models.users
            .scope({ method: ['includeSocial', Models, req.socialProfile.id, req.socialType] })
            .findOne({
                where: {
                    email: req.socialProfile.email
                }
            }).then((result) => {
                if (result && !result.social) {
                    return next(ErrorFactory.conflictError(
                        CONSTANTS.ERROR_MESSAGES.ACCOUNT_EXISTS,
                        [CONSTANTS.ERROR_MESSAGES.PATH_EMAIL]));
                }

                if (!result)
                    req.needCreateProfile = true;

                req.userModel = result;
                return next();
            }).catch(next);
    }

    /**
     * Prepare and save user profile
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    static socialAdapter(req, res, next) {
        if (!req.needCreateProfile)
            return next();

        let social = new socials(req.socialProfile, req.socialType);

        social.prepareUserProfile()
            .then((userProfile) => social.encryptPassword(userProfile))
            .then((user) => social.saveUserProfile(user))
            .then((user) => social.saveSocialInfo(user))
            .then((user) => {
                req.userModel = user;
                return next();
            })
            .catch(next);
    }
}

module.exports = SocialsMiddleware;
