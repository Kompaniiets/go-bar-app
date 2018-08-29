const CONSTANTS = require('../../constants');
const Models = require('../../models/v1');
const socialProfileAdapter = require('../../helpers/socialProfileAdapter');
const Password = require('../../helpers/password');
const ErrorFactory = require('../errors');

class SocialService {

    constructor(profile, type) {
        this.userProfile = profile;
        this.userSocialId = profile.id;
        this.socialType = type;
        this.user = {};
    }

    /**
     * Prepare user profile to saving
     * @returns {Promise}
     */
    prepareUserProfile() {
        const user = socialProfileAdapter(this.userProfile, this.socialType);
        user.password = this.userProfile.id + this.userProfile.email + Math.floor((Math.random() * 10000));
        user.isVerified = true;

        this.userProfile = user;
        return Promise.resolve(user);
    }

    /**
     * Encrypt password for user
     * @param userProfile
     * @returns {Promise}
     */
    encryptPassword(userProfile) {
        userProfile.salt = Password.generateSalt();
        userProfile.password = Password.hash(userProfile.password + userProfile.salt);

        return Promise.resolve(userProfile);
    }

    /**
     * Save user profile
     * @param userBody
     * @returns {Promise.<T>}
     */
    saveUserProfile(userBody) {
        return Models.users.create(userBody)
            .then((user) => {
                this.user = user;
                return Promise.resolve(user);
            })
            .catch((err) => {
                if (err.errors && err.errors.length > 0
                    && err.errors[0].type === CONSTANTS.ERROR_MESSAGES.UNIQUE_VIOLATION) {
                    return Promise.reject(ErrorFactory.unprocessedError(
                        CONSTANTS.ERROR_MESSAGES.EMAIL_TAKEN,
                        [CONSTANTS.ERROR_MESSAGES.PATH_EMAIL]));
                }
                return Promise.reject(err);
            });
    }

    /**
     * Save user profile social info
     * @param user
     */
    saveSocialInfo(user) {
        return Models.socials.create({
            userId: user.id,
            socialId: this.userSocialId,
            type: this.socialType
        }).then(() => this.user);
    }
}


module.exports = SocialService;