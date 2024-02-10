import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import { ApiClient } from '@japa/api-client'

test.group('Delete tag', (group) => {
  // Write your test here
  group.tap((test) => test.tags(['delete-tag']))

  const routes = '/tags'

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  }),
    test('should not find one tag', async ({ client }) => {
      const response = await client.post('/auth/login').json({
        email: 'admin@teste.com',
        password: '123456',
      })

      const { token } = JSON.parse(response.text())

      ApiClient.setup(async (request) => {
        request.bearerToken(token.token)
      })

      const responseDelete = await client.delete(`${routes}/100`)

      responseDelete.assertStatus(404)
    }),
    test('should delete tag', async ({ client }) => {
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
