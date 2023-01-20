'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.createTable('teams', { 
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
    team_name: {
        allowNull: false,
        type: Sequelize.STRING,
      }
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('teams');
  }
};
