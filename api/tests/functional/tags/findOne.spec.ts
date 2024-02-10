import { test } from '@japa/runner'
import { ApiClient } from '@japa/api-client'

test.group('Get one tag', (group) => {
  // Write your test here
  group.tap((test) => test.tags(['get-tag']))

  const routes = 'tags'

  test('should not find a tag findOne', async ({ client }) => {
    const response = await client.post('/auth/login').json({
      email: 'admin@teste.com',
      password: '123456',
    })

    const { token } = JSON.parse(response.text())

    ApiClient.setup(async (request) => {
      request.bearerToken(token.token)
    })
    const responseTag = await client.get(`${routes}/105`)

    responseTag.assertStatus(404)
  }),
    test('should return one tag', async ({ client }) => {
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
