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
        'members',
        {
          id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
          },
          channelId: {
            type: Sequelize.UUID,
            references: {
              model: 'channels',
              key: 'id',
            },
            onDelete: 'CASCADE',
            field: 'channel_id',
          },
          userId: {
            type: Sequelize.UUID,
            references: {
              model: 'user',
              key: 'id',
            },
            field: 'user_id',
          },
          role: {
            type: Sequelize.ENUM('owner', 'admin', 'member', 'none'),
            allowNull: false,
            defaultValue: 'none',
          },
          eChannelKey: {
            type: Sequelize.TEXT,
            allowNull: false,
            field: 'e_channel_key',
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
      await queryInterface.dropTable('members', { transaction });
      await transaction.commit();
    } catch (_) {
      if (transaction) {
        await transaction.rollback();
      }
    }
  },
};
