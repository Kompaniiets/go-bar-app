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
        locationId: {
            type: Sequelize.INTEGER(11),
            allowNull: false
        },
        startAt: {
            type: Sequelize.DATE(3),
            allowNull: false
        },
        duration: {
            type: Sequelize.TIME,
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
        endAt: {
            type: Sequelize.VIRTUAL
        },
    };
};
