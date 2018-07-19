module.exports = (sequelize, Sequelize) => ({
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    barName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    salt: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    token: {
        type: Sequelize.STRING,
    },
    isBar: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE(3),
    },
    updatedAt: {
        type: Sequelize.DATE(3),
    },
});
