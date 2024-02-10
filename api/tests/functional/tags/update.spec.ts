import { test } from '@japa/runner'
import { ApiClient } from '@japa/api-client'
test.group('Update Tags', (group) => {
  // Write your test here
  group.tap((test) => test.tags(['update-tags']))

  const routes = '/tasks'

  test('should not find a tag updated', async ({ client }) => {
    const response = await client.post('/auth/login').json({
      email: 'admin@teste.com',
      password: '123456',
    })

    const { token } = JSON.parse(response.text())

    ApiClient.setup(async (request) => {
      request.bearerToken(token.token)
    })

    const responseUpdate = await client.get(`${routes}/100`)

    responseUpdate.assertStatus(404)
  })
  test('should be updated task with tag', async ({ client }) => {
    const response = await client.post('/auth/login').json({
      email: 'admin@teste.com',
      password: '123456',
    })

    const { token } = JSON.parse(response.text())

    ApiClient.setup(async (request) => {
      request.bearerToken(token.token)
    })
    const responseTask = await client.put(`tasks/update-task/1`).json({
      title: 'task atualizada',
      description: 'descrição atualizada',
      responsable_user_id: 2,
      tags: [
        {
          tag: 'teste atualizado',
        },
      ],
    })
    responseTask.assertStatus(200)
  })
})
