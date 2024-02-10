import { test } from '@japa/runner'
import { ApiClient } from '@japa/api-client'
import Database from '@ioc:Adonis/Lucid/Database'
test.group('Create Tags', (group) => {
  group.tap((test) => test.tags(['create-tags2']))

  const routes = '/tags'

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('You should not create a tag without an existing task', async ({ client }) => {
    const response = await client.post('/auth/login').json({
      email: 'admin@teste.com',
      password: '123456',
    })

    const { token } = JSON.parse(response.text())

    ApiClient.setup(async (request) => {
      request.bearerToken(token.token)
    })
    const responseTask = await client.post(routes).json({
      tag: 'teste',
      task_id: 10,
    })
    responseTask.assertStatus(422)
  })

  test('shouldnt create a tag without a name', async ({ client }) => {
    const response = await client.post('/auth/login').json({
      email: 'admin@teste.com',
      password: '123456',
    })

    const { token } = JSON.parse(response.text())

    ApiClient.setup(async (request) => {
      request.bearerToken(token.token)
    })
    const responseTask = await client.post(routes).json({})
    responseTask.assertStatus(422)
  })

  test('should be create tag', async ({ client }) => {
    const response = await client.post('/auth/login').json({
      email: 'admin@teste.com',
      password: '123456',
    })

    const { token } = JSON.parse(response.text())

    ApiClient.setup(async (request) => {
      request.bearerToken(token.token)
    })
    const responseTag = await client.post(routes).json({
      tag: 'tag',
      task_id: 1,
    })
    responseTag.assertStatus(201)
  })
})
