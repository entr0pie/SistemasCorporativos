'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SaleDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            SaleDetail.belongsTo(models.Sale, {
                foreignKey: 'saleId',
                as: 'sale'
            });
            SaleDetail.belongsTo(models.Product, {
                foreignKey: 'productId',
                as: 'product'
            });
        }
    }

    SaleDetail.init({
        saleId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        unitaryPrice: DataTypes.DOUBLE
    }, {
        sequelize,
        modelName: 'SaleDetail',
    });
    return SaleDetail;
};