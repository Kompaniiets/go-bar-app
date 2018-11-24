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
        checkFreeTables: (models, req) => ({
            where: {
                startsAt: models.sequelize.literal(`
                        ((startAt BETWEEN '${req.bookedDate}' AND DATE_ADD('${req.bookedDate}',
                        INTERVAL ${req.bookedDuration} MINUTE))
                        OR (DATE_ADD(startAt,
                        INTERVAL duration MINUTE) BETWEEN '${req.bookedDate}' AND DATE_ADD('${req.bookedDate}',
                        INTERVAL ${req.bookedDuration} MINUTE))
                        OR (startAt <= '${req.bookedDate}' AND DATE_ADD(startAt,
                        INTERVAL duration MINUTE) >= DATE_ADD('${req.bookedDate}',
                        INTERVAL ${req.bookedDuration} MINUTE)))`
                )
            }
        })
    },
    classMethods: {},
    defaultScope: {}
};
