const createdAtDate = require('../../../helpers/createdAtDate');

module.exports = {
    timestamps: false,
    tableName: 'socials',
    hooks: {
        beforeCreate: (social) => {
            social.createdAt = createdAtDate;
            social.updatedAt = createdAtDate;
        },
    },
    scopes: {
    },
    classMethods: {},
    defaultScope: {}
};
