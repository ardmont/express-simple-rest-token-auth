const bcrypt = require('bcrypt')
const { User, sequelize } = require('../../models')

afterAll(done => {
  sequelize.close()
  done()
})

test('The password is being hashed', () => {
  const faker = require('faker')
  const password = faker.internet.password()

  return User.create({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: password
  }).then((user) => {
    expect(bcrypt.compareSync(password, user.password)).toBe(true)
  })
})
