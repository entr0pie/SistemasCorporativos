'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductMovement extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            ProductMovement.belongsTo(models.Deposit, {
                foreignKey: 'depositId',
                as: 'deposit'
            });
            ProductMovement.belongsTo(models.Product, {
                foreignKey: 'productId',
                as: 'product'
            });
        }
    }

    ProductMovement.init({
        depositId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        movementType: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        unitaryPrice: DataTypes.DOUBLE,
        date: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'ProductMovement',
    });
    return ProductMovement;
};