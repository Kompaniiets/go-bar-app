const createdAtDate = require('../../../helpers/createdAtDate');
const CONSTANTS = require('../../../constants');

module.exports = {
    timestamps: false,
    tableName: 'users',
    hooks: {
        beforeCreate: (user) => {
            user.createdAt = createdAtDate;
            user.updatedAt = createdAtDate;
        },
        beforeUpdate: (user) => {
            user.updatedAt = createdAtDate;
        }
    },

    getterMethods: {},
    defaultScope: {},
    scopes: {
        includeSocial: (models, profileId, type) => ({
            include: [
                {
                    model: models.socials,
                    required: false,
                    where: {
                        socialId: profileId,
                        type: type
                    }
                },
            ]
        })
    },
};