'use strict'
const { Role } = require('../../models')

const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const role = await Role.findOne({ where: { name: 'Admin' } })
    return queryInterface.bulkInsert('Users', [{
      name: 'John Doe',
      email: 'example@example.com',
      password: bcrypt.hashSync('12345', 10),
      roleId: role.id,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
