import { test } from '@japa/runner'
import { ApiClient } from '@japa/api-client'
test.group('Tasks list', (group) => {
  // Write your test here
  group.tap((test) => test.tags(['list-tasks']))

  const routes = '/tasks/all'

  test('should return all tasks', async ({ client }) => {
    const response = await client.post('/auth/login').json({
      email: 'admin@teste.com',
      password: '123456',
    })

    const { token } = JSON.parse(response.text())

    ApiClient.setup(async (request) => {
      request.bearerToken(token.token)
    })
    const responseTask = await client.get(routes)
    responseTask.assertStatus(200)
  })
  test('should return filtered tasks per tags', async ({ client }) => {
    const response = await client.post('/auth/login').json({
      email: 'admin@teste.com',
      password: '123456',
    })

    const { token } = JSON.parse(response.text())

    ApiClient.setup(async (request) => {
      request.bearerToken(token.token)
    })
    const responseTask = await client.get(routes)
    responseTask.assertStatus(200)
  })
  test('should return filtered tasks per title', async ({ client }) => {
    const response = await client.post('/auth/login').json({
      email: 'admin@teste.com',
      password: '123456',
    })

    const { token } = JSON.parse(response.text())

    ApiClient.setup(async (request) => {
      request.bearerToken(token.token)
    })
    const responseTask = await client.get(routes)
    responseTask.assertStatus(200)
  })
  test('should return filtered tasks per description', async ({ client }) => {
    const response = await client.post('/auth/login').json({
      email: 'admin@teste.com',
      password: '123456',
    })

    const { token } = JSON.parse(response.text())

    ApiClient.setup(async (request) => {
      request.bearerToken(token.token)
    })
    const responseTask = await client.get(routes)
    responseTask.assertStatus(200)
  })
  test('should return filtered tasks per responsable', async ({ client }) => {
    const response = await client.post('/auth/login').json({
      email: 'admin@teste.com',
      password: '123456',
    })

    const { token } = JSON.parse(response.text())

    ApiClient.setup(async (request) => {
      request.bearerToken(token.token)
    })
    const responseTask = await client.get(routes)
    responseTask.assertStatus(200)
  })
})
