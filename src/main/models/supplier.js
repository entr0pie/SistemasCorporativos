'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Supplier extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Supplier.hasMany(models.Quotation, {
                foreignKey: 'supplierId',
                as: 'quotations'
            });

        }
    }

    Supplier.init({
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        phone: DataTypes.STRING,
        cin: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Supplier',
    });
    return Supplier;
};