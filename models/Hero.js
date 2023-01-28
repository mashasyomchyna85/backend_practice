'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Hero.hasMany(models.Image, {
        foreignKey: 'heroId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'}
      );
      Hero.belongsToMany(models.Power, {
        through: 'heroes_to_powers',
        foreignKey: 'heroId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Hero.init({
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    realName: {
      field: 'real_name',
      type: DataTypes.STRING,
      allowNull: false
    },
    originDescription: {
      field: 'origin_description',
      type: DataTypes.STRING
    },
    catchPhrase: {
      field: 'catch_phrase',
      type: DataTypes.STRING
    },
  
  }, {
    sequelize,
    modelName: 'Hero',
    tableName: 'heroes',
    underscored: true
  });
  return Hero;
};