import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const users = [
  {
    id: uuidv4(),
    first_name: '',
    last_name: '',
  },
];
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    try {
      const statesAdded = [];
      for (const user of users) {
        const record = await queryInterface.rawSelect(
          'user',
          {
            where: {
              [Op.or]: [
                {
                  email: user.email,
                },
                {
                  phone: user.phone,
                },
              ],
            },
          },
          ['id'],
        );
        if (!record) {
          statesAdded.push({ ...user, id: uuidv4() });
        }
      }
      if (statesAdded.length) return queryInterface.bulkInsert('user', statesAdded);
    } catch (error) {
      return Promise.resolve();
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
