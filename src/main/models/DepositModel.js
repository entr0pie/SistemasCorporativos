const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define('Deposit', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        name: {
            type: DataTypes.STRING,
            unique: true,
        },

        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        }
    });
}