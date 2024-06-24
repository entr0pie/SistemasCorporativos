'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MovementFinancialSecurityToReceive extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            MovementFinancialSecurityToReceive.belongsTo(models.FinancialSecurityToReceive, {
                foreignKey: 'financialSecurityToReceiveId',
                as: 'financialSecurityToReceive'
            });
        }
    }

    MovementFinancialSecurityToReceive.init({
        financialSecurityToReceiveId: DataTypes.INTEGER,
        type: DataTypes.STRING,
        value: DataTypes.DOUBLE,
        date: DataTypes.DATE,
        fineValue: DataTypes.DOUBLE,
        feeValue: DataTypes.DOUBLE
    }, {
        sequelize,
        modelName: 'MovementFinancialSecurityToReceive',
    });
    return MovementFinancialSecurityToReceive;
};