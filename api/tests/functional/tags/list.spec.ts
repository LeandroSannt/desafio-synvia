import { test } from '@japa/runner'
import { ApiClient } from '@japa/api-client'
test.group('Tag list', (group) => {
  group.tap((test) => test.tags(['list-tags']))

  const routes = '/tags'

  test('should return all tags', async ({ client }) => {
    const response = await client.post('/auth/login').json({
      email: 'admin@teste.com',
      password: '123456',
    })

    const { token } = JSON.parse(response.text())

    ApiClient.setup(async (request) => {
      request.bearerToken(token.token)
    })
    const responseTask = await client.get(routes)
    responseTask.assertStatus(201)
  })
})
