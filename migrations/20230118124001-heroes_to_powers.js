'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('heroes_to_powers', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true
      }, 
      heroId:{
        field: 'hero_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'heroes',
          key: 'id',
          as: 'heroId'
        }
      },
      powerId: {
        field: 'power_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'powers',
          key: 'id'
        }
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('heroes_to_powers');
  }
};
