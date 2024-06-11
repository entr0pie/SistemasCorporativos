'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MovementFinancialSecurityToPays', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      financialSecurityToPayId: {
        type: Sequelize.NUMBER
      },
      type: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.DOUBLE
      },
      date: {
        type: Sequelize.DATE
      },
      fineValue: {
        type: Sequelize.DOUBLE
      },
      feeValue: {
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MovementFinancialSecurityToPays');
  }
};