const createdAtDate = require('../../../helpers/createdAtDate');

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
        image: models => ({
            include: [
                {
                    model: models.images,
                    as: 'image',
                    required: false,
                },
            ],
        }),
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