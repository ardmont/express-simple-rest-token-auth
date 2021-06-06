module.exports = new Promise((resolve, reject) => {
  const { sequelize } = require('./models')
  sequelize.authenticate()
    .then(() => {
      console.log('Database connection has been established successfully.')
      resolve()
    })
    .catch((err) => {
      console.error('Unable to connect to the database:')
      reject(err)
    })
})
