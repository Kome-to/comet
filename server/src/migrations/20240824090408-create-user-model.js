module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('user', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      firstName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: 'first_name',
      },
      lastName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: 'last_name',
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        field: 'email',
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_active',
      },
      password: {
        type: Sequelize.STRING(200),
        allowNull: false,
        field: 'password',
      },
      publicKey: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: 'public_key',
      },

      ePrivateKey: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: 'e_private_key',
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('user');
  },
};
