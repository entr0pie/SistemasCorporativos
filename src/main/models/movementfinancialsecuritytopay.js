'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MovementFinancialSecurityToPay extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            MovementFinancialSecurityToPay.belongsTo(models.FinancialSecurityToPay, {
                foreignKey: 'financialSecurityToPayId',
                as: 'financialSecurityToPay'
            });
        }
    }

    MovementFinancialSecurityToPay.init({
        financialSecurityToPayId: DataTypes.INTEGER,
        type: DataTypes.STRING,
        value: DataTypes.DOUBLE,
        date: DataTypes.DATE,
        /**
         * Valor de multa.
         */
        fineValue: DataTypes.DOUBLE,

        /**
         * Valor de juros.
         */
        feeValue: DataTypes.DOUBLE
    }, {
        sequelize,
        modelName: 'MovementFinancialSecurityToPay',
    });
    return MovementFinancialSecurityToPay;
};