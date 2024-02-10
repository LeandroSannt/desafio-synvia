import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

test.group('User store', (group) => {
  // Write your test here
  group.tap((test) => test.tags(['create-user']))

  const routes = '/users'

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  }),
    test('the email must be unique', async ({ client }) => {
      const response = await client.post(routes).json({
        name: 'leandro',
        email: 'admin@teste.com',
        password: '123456',
        password_confirmation: '123456',
      })

      response.assertStatus(422)
    }),
    test('the password and password confirmation cannot be different', async ({ client }) => {
      const response = await client.post(routes).json({
        name: 'leandro',
        email: 'leandro@gmail.com',
        password: '123456',
        password_confirmation: '123457',
      })

      response.assertStatus(422)
    }),
    test('should create user', async ({ client }) => {
      const response = await client.post(routes).json({
        name: 'leandro',
        email: 'leandro@gmail.com',
        password: '123456',
        password_confirmation: '123456',
      })

      response.assertStatus(201)
    })
})
