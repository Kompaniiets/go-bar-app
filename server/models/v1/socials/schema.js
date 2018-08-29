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
        socialId: {
            type: Sequelize.INTEGER(11),
            allowNull: false
        },
        type: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            defaultValue: 1,
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
