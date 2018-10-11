'use strict';

module.exports = function (sequelize, Sequelize) {
    return {
        id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.INTEGER(11),
            allowNull: false
        },
        title: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        info: {
            type: Sequelize.STRING(256),
        },
        lat: {
            type: Sequelize.DECIMAL(10, 7),
            allowNull: false,
        },
        lng: {
            type: Sequelize.DECIMAL(10, 7),
            allowNull: false,
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
