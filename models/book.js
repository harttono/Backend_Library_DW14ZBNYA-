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
        foreignKey:{
          name:"categoryId"
        }
      })

      Book.belongsTo(models.User,{
        foreignKey:{
          name:"userId"
        }
      })
    }
  };
  Book.init({
    title: DataTypes.STRING,
    publication: DataTypes.DATE,
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    pages: DataTypes.INTEGER,
    ISBN: DataTypes.BIGINT,
    description: DataTypes.STRING,
    file: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};