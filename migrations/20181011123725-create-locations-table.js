'use strict';

module.exports = {
    up: (queryInterface) => (
        queryInterface.sequelize.query(`
            CREATE TABLE locations (
              id INT NOT NULL AUTO_INCREMENT,
              userId INT NOT NULL,
              title VARCHAR(50) NOT NULL,
              info VARCHAR(256) DEFAULT NULL,
              lat DECIMAL(10,7) NOT NULL,
              lng DECIMAL(10,7) NOT NULL,
              createdAt DATETIME(3) DEFAULT NULL,
              updatedAt DATETIME(3) DEFAULT NULL,
              PRIMARY KEY (id),
              INDEX IdxLocationUser (userId ASC),
              CONSTRAINT FkLocationUser
                FOREIGN KEY (userId)
                REFERENCES users (id)
                ON DELETE CASCADE
                ON UPDATE CASCADE);
        `)),

    down: (queryInterface) => queryInterface.dropTable('locations'),
};
