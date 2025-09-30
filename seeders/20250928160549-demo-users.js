'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'ram',
        email: 'ram@gmail.com',
        phone_number: '1234567890',
      },
      {
        username: 'naresh',
        email: 'naresh@gmail.com',
        phone_number: '0987654321',
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
