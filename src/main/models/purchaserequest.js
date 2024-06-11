'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PurchaseRequest extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            PurchaseRequest.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user'
            });
            PurchaseRequest.belongsTo(models.Product, {
                foreignKey: 'productId',
                as: 'product'
            });
            PurchaseRequest.belongsTo(models.Deposit, {
                foreignKey: 'depositId',
                as: 'deposit'
            });
            PurchaseRequest.hasOne(models.Purchase, {
                foreignKey: 'purchaseRequestId',
                as: 'purchase'
            });
        }
    }

    PurchaseRequest.init({
        userId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        depositId: DataTypes.INTEGER,
        parcels: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        status: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED")
    }, {
        sequelize,
        modelName: 'PurchaseRequest',
    });
    return PurchaseRequest;
};