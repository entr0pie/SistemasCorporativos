'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class FinancialSecurityToReceive extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            FinancialSecurityToReceive.hasMany(models.MovementFinancialSecurityToReceive, {
                foreignKey: 'financialSecurityToReceiveId',
                as: 'movement'
            });
        }
    }

    FinancialSecurityToReceive.init({
        invoice: DataTypes.STRING,
        parcels: DataTypes.INTEGER,
        value: DataTypes.DOUBLE,
        expirationDate: DataTypes.DATE,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'FinancialSecurityToReceive',
    });
    return FinancialSecurityToReceive;
};