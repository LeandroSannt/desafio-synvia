import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

test.group('Authentication', (group) => {
  group.tap((test) => test.tags(['auth']))

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('should fail with status 404', async ({ client }) => {
    const response = await client.post('/auth/login').json({
      email: 'jonhdoe@gmail.com',
      password: '123456',
    })

    response.assertStatus(404)
  }),
    test('should login successfully', async ({ client }) => {
      const response = await client.post('/auth/login').json({
        email: 'admin@teste.com',
        password: '123456',
      })

      response.assertStatus(201)
    })
})
