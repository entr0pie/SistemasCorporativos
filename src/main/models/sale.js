'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Sale extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Sale.belongsTo(models.Client, {
                foreignKey: 'clientId',
                as: 'client'
            });
            Sale.hasMany(models.SaleDetail, {
                foreignKey: 'saleId',
                as: 'details'
            });
        }
    }

    Sale.init({
        invoice: DataTypes.STRING,
        sellingDate: DataTypes.DATE,
        clientId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Sale',
    });
    return Sale;
};