'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CostCenter extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            CostCenter.hasMany(models.Quotation, {
                foreignKey: 'costCenterId',
                as: 'quotations'
            });
        }
    }

    CostCenter.init({
        code: DataTypes.STRING,
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'CostCenter',
    });
    return CostCenter;
};