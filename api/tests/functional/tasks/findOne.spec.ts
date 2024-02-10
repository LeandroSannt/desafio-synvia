import { test } from '@japa/runner'
import { ApiClient } from '@japa/api-client'

test.group('Get one task', (group) => {
  // Write your test here
  group.tap((test) => test.tags(['get-task']))

  const routes = 'tasks/get-task'

  test('should not find a task', async ({ client }) => {
    const response = await client.post('/auth/login').json({
      email: 'admin@teste.com',
      password: '123456',
    })

    const { token } = JSON.parse(response.text())

    ApiClient.setup(async (request) => {
      request.bearerToken(token.token)
    })
    const responseTask = await client.get(`${routes}/2`)

    responseTask.assertStatus(404)
  }),
    test('should return one task', async ({ client }) => {
      const response = await client.post('/auth/login').json({
        email: 'admin@teste.com',
        password: '123456',
      })

      const { token } = JSON.parse(response.text())

      ApiClient.setup(async (request) => {
        request.bearerToken(token.token)
      })
      const responseTask = await client.get(`${routes}/1`)

      responseTask.assertStatus(200)
    })
})
