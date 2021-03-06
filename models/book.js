'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Book.belongsTo(models.Category,{
        as:"categoryId",
        foreignKey:{
          name:"category",
        }
      })

      Book.belongsTo(models.User,{
        as:"userId",
        foreignKey:{
          name:"user"
        }
      })
    }
  };
  Book.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    publication: DataTypes.DATE,
    category: DataTypes.INTEGER,
    user: DataTypes.INTEGER,
    pages: DataTypes.INTEGER,
    ISBN: DataTypes.BIGINT,
    description: DataTypes.STRING,
    file: DataTypes.STRING,
    cover:DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};