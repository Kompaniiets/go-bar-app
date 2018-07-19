const createdAtDate = require('../../../helpers/createdAtDate');
const CONSTANTS = require('../../../constants');

module.exports = {
    timestamps: false,
    tableName: 'users',
    hooks: {
        beforeCreate: (user) => {
            user.createdAt = createdAtDate.createdAt();
            user.updatedAt = createdAtDate.createdAt();
        },
        beforeUpdate: (user) => {
            user.updatedAt = createdAtDate.createdAt();
        }
    },

    getterMethods: {},
    defaultScope: {},
    scopes: {

    },
};