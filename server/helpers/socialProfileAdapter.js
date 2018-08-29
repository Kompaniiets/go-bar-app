const CONSTANTS = require('./../constants');

module.exports = ((userProfile, socialType) => {
    if (socialType === CONSTANTS.SOCIALS.FACEBOOK) {
        return {
            email: userProfile.email,
            firstName: userProfile.first_name,
            lastName: userProfile.last_name,
            avatarUrl: (userProfile.picture && userProfile.picture.data.url) ? userProfile.picture.data.url : '',
        };
    }

    return null;
});
