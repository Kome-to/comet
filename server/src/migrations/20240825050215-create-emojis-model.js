'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    let transaction;
    try {
      transaction = await queryInterface.sequelize.transaction();
      await queryInterface.createTable(
        'emojis',
        {
          id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
          },
          userId: {
            type: Sequelize.UUID,
            references: {
              model: 'user',
              key: 'id',
            },
            onDelete: 'CASCADE',
            field: 'user_id',
          },
          chatId: {
            type: Sequelize.UUID,
            references: {
              model: 'chat',
              key: 'id',
            },
            onDelete: 'CASCADE',
            field: 'chat_id',
          },
          unicode: {
            type: Sequelize.STRING(50),
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            field: 'created_at',
          },
          updatedAt: {
            type: Sequelize.DATE,
            field: 'updated_at',
          },
        },
        { transaction },
      );
      await transaction.commit();
    } catch (_) {
      if (transaction) {
        await transaction.rollback();
      }
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    let transaction;
    try {
      transaction = await queryInterface.sequelize.transaction();
      await queryInterface.dropTable('emojis', { transaction });
      await transaction.commit();
    } catch (_) {
      if (transaction) {
        await transaction.rollback();
      }
    }
  },
};
