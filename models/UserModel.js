const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        email: {
            type: DataTypes.STRING,
            unique: true,
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
}