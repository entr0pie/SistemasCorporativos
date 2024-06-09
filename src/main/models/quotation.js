'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Quotation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Quotation.belongsTo(models.Product, {
                foreignKey: 'productId',
                as: 'product'
            });
            Quotation.belongsTo(models.Supplier, {
                foreignKey: 'supplierId',
                as: 'supplier'
            });
            Quotation.belongsTo(models.CostCenter, {
                foreignKey: 'costCenterId',
                as: 'costCenter'
            });
        }
    }

    Quotation.init({
        productId: DataTypes.INTEGER,
        supplierId: DataTypes.INTEGER,
        price: DataTypes.DOUBLE,
        date: DataTypes.DATE,
        costCenterId: DataTypes.INTEGER,
        expirationDate: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Quotation',
    });
    return Quotation;
};