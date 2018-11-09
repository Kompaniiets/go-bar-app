const createdAtDate = require('../../../helpers/createdAtDate');

module.exports = {
    timestamps: false,
    tableName: 'bookings',
    hooks: {
        beforeCreate: (booking) => {
            booking.createdAt = createdAtDate;
            booking.updatedAt = createdAtDate;
        }
    },
    scopes: {
    },
    classMethods: {},
    defaultScope: {}
};
