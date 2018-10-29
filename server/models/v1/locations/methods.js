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
        byIds: (ids) => ({
            where: {
                id: {
                    $in: ids
                }
            }
        }),
        includeSchedules: (models, required = false) => ({
            include: [
                {
                    model: models.schedules,
                    required: required,
                }
            ]
        })
    },
    classMethods: {},
    defaultScope: {}
};
