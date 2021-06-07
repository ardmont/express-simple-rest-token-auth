'use strict'
const { Role } = require('../../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const role = await Role.findOne({ where: { name: 'Admin' } })
    return queryInterface.bulkInsert('Users', [{
      name: 'John Doe',
      email: 'example@example.com',
      password: '$2y$10$EI/RxTChVUoPmJf.2Cbda.i55UISjduTRRqD5UEHJJzprBMScClyu',
      roleId: role.id,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
