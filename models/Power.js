'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Power extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Power.belongsToMany(models.Hero, {
        through: 'heroes_to_powers',
        foreignKey: 'powerId'
      }, { onDelete: 'CASCADE',
      onUpdate: 'CASCADE'});
    }
  }
  Power.init({
    powerName: {
      field: 'power_name',
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Power',
    tableName: 'powers',
    underscored: true
  });
  return Power;
};