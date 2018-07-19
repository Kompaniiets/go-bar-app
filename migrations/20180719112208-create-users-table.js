'use strict';

module.exports = {
    up: (queryInterface) => {
        return queryInterface.sequelize.query(`
            CREATE TABLE users (
            id INT(11) NOT NULL AUTO_INCREMENT,
            email VARCHAR(150) NOT NULL,
            firstName VARCHAR(30) NOT NULL,
            lastName VARCHAR(30) NOT NULL,
            barName VARCHAR(50) DEFAULT NULL,
            phone varchar(40) NULL DEFAULT '',
            password VARCHAR(256) NOT NULL,
            salt VARCHAR(256) NOT NULL,
            token VARCHAR(512),
            isBar TINYINT NOT NULL DEFAULT 0 COMMENT '0 - false, 1 - true',
            isVerified TINYINT NOT NULL DEFAULT 0 COMMENT '0 - false, 1 - true',
            createdAt DATETIME(3) DEFAULT NULL,
            updatedAt DATETIME(3) DEFAULT NULL,
            PRIMARY KEY (id),
            UNIQUE INDEX idxEmail (email ASC));
        `);
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('users');
    },
};
