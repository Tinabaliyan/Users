'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Blogs', [
      {
        blogData: 'This is the first blog post by Ram.',
        userId: 1,  // Using the actual user ID from database
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        blogData: 'Naresh shares his thoughts on technology in his first post.',
        userId: 2,  // Using the actual user ID from database
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Blogs', null, {});
  }
};
