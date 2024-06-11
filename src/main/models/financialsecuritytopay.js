'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class FinancialSecurityToPay extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            FinancialSecurityToPay.hasMany(models.MovementFinancialSecurityToPay, {
                foreignKey: 'financialSecurityToPayId',
                as: 'movement'
            });
        }
    }

    FinancialSecurityToPay.init({
        invoice: DataTypes.STRING,
        parcels: DataTypes.INTEGER,
        value: DataTypes.DOUBLE,
        expirationDate: DataTypes.DATE,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'FinancialSecurityToPay',
    });
    return FinancialSecurityToPay;
};