'use strict'
const bcrypt = require('bcrypt')
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      User.belongsTo(models.Role, {
        foreignKey: 'roleId'
      })
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      set (value) {
        this.setDataValue('password', bcrypt.hashSync(value, 10))
      }
    }
  }, {
    sequelize,
    modelName: 'User'
  })
  return User
}
