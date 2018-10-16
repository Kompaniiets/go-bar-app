'use strict';

module.exports = function (sequelize, Sequelize) {
    return {
        id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        locationId: {
            type: Sequelize.INTEGER(11),
            allowNull: false
        },
        opensIn: {
            type: Sequelize.TIME,
            allowNull: false
        },
        closesIn: {
            type: Sequelize.TIME,
            allowNull: false
        },
        numberOfTables: {
            type: Sequelize.INTEGER(11),
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE(3),
            allowNull: true
        },
        updatedAt: {
            type: Sequelize.DATE(3),
            allowNull: true
        },
    };
};
