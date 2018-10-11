const createdAtDate = require('../../../helpers/createdAtDate');

module.exports = {
    timestamps: false,
    tableName: 'locations',
    hooks: {
        beforeCreate: (location) => {
            location.createdAt = createdAtDate;
            location.updatedAt = createdAtDate;
        },
        beforeBulkCreate: (locations) => {
            for (const location of locations) {
                location.createdAt = createdAtDate;
                location.updatedAt = createdAtDate;
            }
        },
    },
    scopes: {
    },
    classMethods: {},
    defaultScope: {}
};
