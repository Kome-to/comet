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
        'channels',
        {
          id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
          },
          workspaceId: {
            type: Sequelize.UUID,
            references: {
              model: 'workspaces',
              key: 'id',
            },
            onDelete: 'CASCADE',
            field: 'workspace_id',
          },
          name: {
            type: Sequelize.STRING(50),
            allowNull: false,
          },
          isPrivate: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: 'is_private',
          },
          publicKey: {
            type: Sequelize.TEXT,
            allowNull: false,
            field: 'public_key',
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
      await queryInterface.dropTable('channels', { transaction });
      await transaction.commit();
    } catch (_) {
      if (transaction) {
        await transaction.rollback();
      }
    }
  },
};
