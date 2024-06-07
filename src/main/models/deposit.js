'use strict';
const {
    Model, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Deposit extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Deposit.hasMany(models.ProductMovement, {
                foreignKey: 'depositId',
                as: 'movements'
            });
        }
    }

    Deposit.init({
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Deposit',
    });
    return Deposit;
};