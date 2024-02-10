import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import { ApiClient } from '@japa/api-client'

test.group('Delete task', (group) => {
  // Write your test here
  group.tap((test) => test.tags(['delete-task']))

  const routes = '/tasks'

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  }),
    test('should not find a task', async ({ client }) => {
      const response = await client.post('/auth/login').json({
        email: 'admin@teste.com',
        password: '123456',
      })

      const { token } = JSON.parse(response.text())

      ApiClient.setup(async (request) => {
        request.bearerToken(token.token)
      })

      const responseDelete = await client.delete(`${routes}/2`)

      responseDelete.assertStatus(404)
    }),
    test('should delete task', async ({ client }) => {
      const response = await client.post('/auth/login').json({
        email: 'admin@teste.com',
        password: '123456',
      })

      const { token } = JSON.parse(response.text())

      ApiClient.setup(async (request) => {
        request.bearerToken(token.token)
      })
      const responseDelete = await client.delete(`${routes}/1`)

      responseDelete.assertStatus(204)
    })
})
