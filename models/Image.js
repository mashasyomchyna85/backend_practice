'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo(models.Hero, {
        foreignKey: 'heroId'
      }, { onDelete: 'CASCADE',
      onUpdate: 'CASCADE'});
    }
  }
  Image.init({
    imagePath: {
      field: 'image_path',
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'Image',
    tableName: 'images',
    underscored: true
  });
  return Image;
};