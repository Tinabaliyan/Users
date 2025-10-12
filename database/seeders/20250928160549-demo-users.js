'use strict';
const bcrypt = require('bcrypt'); // Add bcrypt to hash passwords

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword1 = await bcrypt.hash('password123', 10);
    const hashedPassword2 = await bcrypt.hash('secure456', 10);

    await queryInterface.bulkInsert('Users', [
      {
        username: 'ram',
        email: 'ram@gmail.com',
        phone_number: '1234567890',
        password: hashedPassword1, // Add hashed password
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'naresh',
        email: 'naresh@gmail.com',
        phone_number: '0987654321',
        password: hashedPassword2, // Add hashed password
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
