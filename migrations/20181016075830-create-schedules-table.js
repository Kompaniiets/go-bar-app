'use strict';

module.exports = {
    up: (queryInterface) => (
        queryInterface.sequelize.query(`
            CREATE TABLE schedules (
              id INT NOT NULL AUTO_INCREMENT,
              locationId INT NOT NULL,
              opensIn TIME NOT NULL DEFAULT '00:00:00',
              closesIn TIME NOT NULL DEFAULT '00:00:00',
              numberOfTables INT NOT NULL,
              createdAt DATETIME(3) DEFAULT NULL,
              updatedAt DATETIME(3) DEFAULT NULL,
              PRIMARY KEY (id),
              INDEX IdxLocationSchedule (locationId ASC),
              CONSTRAINT FkLocationSchedule
                FOREIGN KEY (locationId)
                REFERENCES locations (id)
                ON DELETE CASCADE
                ON UPDATE CASCADE);
        `)),

    down: (queryInterface) => queryInterface.dropTable('schedules'),
};
