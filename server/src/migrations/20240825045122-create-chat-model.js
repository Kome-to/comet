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
        'chat',
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
          channelId: {
            type: Sequelize.UUID,
            references: {
              model: 'channels',
              key: 'id',
            },
            onDelete: 'CASCADE',
            field: 'channel_id',
          },
          content: {
            type: Sequelize.TEXT,
          },
          parentId: {
            type: Sequelize.UUID,
            references: {
              model: 'chat',
              key: 'id',
            },
            onDelete: 'CASCADE',
            field: 'parent_id',
          },
          totalReplies: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: 'total_replies',
          },
          eSessionKey: {
            type: Sequelize.TEXT,
            allowNull: false,
            field: 'e_session_key',
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

      await queryInterface.sequelize.query(
        `
        CREATE OR REPLACE FUNCTION chat__update_total_replies()
        RETURNS TRIGGER
        LANGUAGE plpgsql
        AS $$
        BEGIN
            IF TG_OP = 'INSERT' THEN
              IF NEW.parent_id IS NOT NULL THEN
                UPDATE chat
                SET total_replies = total_replies + 1
                WHERE id = NEW.parent_id;
              END IF;
            END IF;

            IF TG_OP = 'DELETE' THEN
              IF OLD.parent_id IS NOT NULL THEN
                UPDATE chat
                SET total_replies = total_replies - 1
                WHERE id = OLD.parent_id;
              END IF;
            END IF;

            RETURN NEW;
        END;
        $$;

        DROP TRIGGER IF EXISTS chat__update_total_replies ON "chat";

        CREATE TRIGGER trg_chat__update_total_replies
        AFTER INSERT OR DELETE ON chat
        FOR EACH ROW
        EXECUTE FUNCTION chat__update_total_replies();
        `,
        { transaction },
      );

      await transaction.commit();
    } catch (error) {
      console.error(error);
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
      await queryInterface.dropTable('chat', { transaction });
      await transaction.commit();
    } catch (_) {
      if (transaction) {
        await transaction.rollback();
      }
    }
  },
};
