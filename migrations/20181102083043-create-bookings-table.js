'use strict';

module.exports = {
    up: (queryInterface) => (
        queryInterface.sequelize.query(`
            CREATE TABLE bookings (
              id INT NOT NULL AUTO_INCREMENT,
              userId INT NOT NULL,
              locationId INT NOT NULL,
              startAt DATETIME(3) NOT NULL,
              duration TIME NOT NULL DEFAULT '00:00:00',
              createdAt DATETIME(3) DEFAULT NULL,
              updatedAt DATETIME(3) DEFAULT NULL,
              PRIMARY KEY (id),
              INDEX IdxBookingUser (userId ASC),
              INDEX IdxBookingLocation (locationId ASC),
              CONSTRAINT FkBookingUser
                FOREIGN KEY (userId)
                REFERENCES users (id)
                ON DELETE CASCADE
                ON UPDATE CASCADE, 
              CONSTRAINT FkBookingLocation
                FOREIGN KEY (locationId)
                REFERENCES locations (id)
                ON DELETE CASCADE
                ON UPDATE CASCADE);
        `)),

    down: (queryInterface) => queryInterface.dropTable('bookings'),
};
