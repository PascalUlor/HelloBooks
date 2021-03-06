import Sequelize from 'sequelize';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true,
        unique: 'compositeIndex'
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true,
        unique: 'compositeIndex'
      },
      ISBN: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: () => randomId()
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      categoryId: {
        allownull: false,
        type: Sequelize.INTEGER
      },
      bookImage: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down (queryInterface, Sequelize) {
    return queryInterface.dropTable('Books');
  }
};
