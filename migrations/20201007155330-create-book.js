'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      publication: {
        type: Sequelize.DATE
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"Categories",
          key:"id"
        },
        onUpdate:"cascade",
        onDelete:"cascade"
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"Users",
          key:"id"
        },
        onUpdate:"cascade",
        onDelete:"cascade"
      },
      pages: {
        type: Sequelize.INTEGER
      },
      ISBN: {
        type: Sequelize.BIGINT
      },
      description: {
        type: Sequelize.STRING
      },
      file: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Books');
  }
};