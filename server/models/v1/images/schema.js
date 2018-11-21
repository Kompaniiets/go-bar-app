'use strict';
const CONSTANTS = require('../../../constants');

module.exports = function (sequelize, Sequelize) {
    return {
        id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        url: {
            type: Sequelize.STRING(512),
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE(3)
        },
        type: {
            type: Sequelize.VIRTUAL,
            defaultValue: CONSTANTS.IMAGES.TYPE_AVATAR,
        }
    };
};
