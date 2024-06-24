'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Product.hasMany(models.ProductMovement, {
                foreignKey: 'productId',
                as: 'movement'
            });

            Product.hasMany(models.Quotation, {
                foreignKey: 'productId',
                as: 'quotations'
            });

            Product.hasMany(models.PurchaseRequest, {
                foreignKey: 'productId',
                as: 'purchaseRequests'
            });

            Product.hasMany(models.SaleDetail, {
                foreignKey: 'productId',
                as: 'purchaseOrders'
            });
        }
    }

    Product.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};