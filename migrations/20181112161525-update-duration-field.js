'use strict';

module.exports = {
    up: (queryInterface) => {
        return queryInterface.sequelize.query(`
            ALTER TABLE bookings 
              MODIFY duration INT NOT NULL DEFAULT 30;
        `);
    },

    down: (queryInterface) => {
        return queryInterface.sequelize.query(`
            ALTER TABLE bookings
              MODIFY duration TIME NOT NULL DEFAULT '00:00:00';
        `);
    },
};
