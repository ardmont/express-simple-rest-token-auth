
const { Sequelize } = require('sequelize')

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING)

module.exports = sequelize
