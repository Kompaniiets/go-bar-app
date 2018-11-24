'use strict';

module.exports = {
    up: (queryInterface) => {
        return queryInterface.sequelize.query(`
            CREATE TABLE images (
            id INT(11) NOT NULL AUTO_INCREMENT,            
            url VARCHAR(512) NOT NULL,
            createdAt DATETIME(3),
            PRIMARY KEY (id));`
        ).then(() => {
            return queryInterface.sequelize.query(`
                ALTER TABLE users 
                ADD COLUMN imageId INT NULL DEFAULT NULL AFTER isBar,
                ADD CONSTRAINT FkImageId
                FOREIGN KEY (imageId)
                REFERENCES images (id)
                ON DELETE SET NULL
                ON UPDATE CASCADE;`);
        });
    },

    down: (queryInterface) => {
        return queryInterface.sequelize.query(`
            ALTER TABLE users 
                DROP FOREIGN KEY FkImageId;                          
        `).then(() => {
            return queryInterface.sequelize.query(`
                ALTER TABLE users
                    DROP COLUMN imageId;`);
        }).then(() => {
            return queryInterface.sequelize.query(`
                DROP TABLE images
            `);
        });
    }
};
