'use strict';

module.exports = {
    up: (queryInterface) => {
        return queryInterface.sequelize.query(`
            CREATE TABLE socials (
              id INT NOT NULL AUTO_INCREMENT,
              userId INT NOT NULL,
              socialId VARCHAR(256) NOT NULL,
              type INT NOT NULL DEFAULT 1 COMMENT '1 - facebook',
              createdAt DATETIME(3) DEFAULT NULL,
              updatedAt DATETIME(3) DEFAULT NULL,
              PRIMARY KEY (id),
              INDEX IdxSocialsUser (userId ASC),
              CONSTRAINT FkSocialUser
                FOREIGN KEY (userId)
                REFERENCES users (id)
                ON DELETE CASCADE
                ON UPDATE CASCADE);
        `);
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('socials');
    },
};
