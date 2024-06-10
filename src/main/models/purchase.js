'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Purchase extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Purchase.belongsTo(models.Quotation, {foreignKey: 'quotationId'});
            Purchase.belongsTo(models.PurchaseRequest, {foreignKey: 'purchaseRequestId'});
        }
    }

    Purchase.init({
        quotationId: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        unitaryPrice: DataTypes.DOUBLE,
        purchaseRequestId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Purchase',
    });
    return Purchase;
};