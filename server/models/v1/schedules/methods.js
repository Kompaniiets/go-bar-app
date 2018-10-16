const createdAtDate = require('../../../helpers/createdAtDate');

module.exports = {
    timestamps: false,
    tableName: 'schedules',
    hooks: {
        beforeCreate: (schedule) => {
            schedule.createdAt = createdAtDate;
            schedule.updatedAt = createdAtDate;
        }
    },
    scopes: {
    },
    classMethods: {},
    defaultScope: {}
};
