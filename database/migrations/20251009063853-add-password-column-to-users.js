'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.describeTable('Users');

    // Only add column if it doesn't exist
    if (!table.password) {
      console.log('Adding password column to Users table...');
      await queryInterface.addColumn('Users', 'password', {
        type: Sequelize.STRING,
        allowNull: false,
      });
    } else {
      console.log('Column "password" already exists. Skipping...');
    }
  },

  down: async (queryInterface, Sequelize) => {
    const table = await queryInterface.describeTable('Users');

    if (table.password) {
      console.log('Removing password column from Users table...');
      await queryInterface.removeColumn('Users', 'password');
    } else {
      console.log('Column "password" does not exist. Nothing to remove.');
    }
  }
};
